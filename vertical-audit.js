const pages = await fetch('http://127.0.0.1:9224/json').then(response => response.json());
const page = pages.find(item => item.type === 'page');
const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
const runtimeErrors = [];
let nextId = 1;

socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
  if (message.method === 'Runtime.exceptionThrown') runtimeErrors.push(message.params.exceptionDetails.text);
  if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
    runtimeErrors.push(message.params.args.map(argument => argument.value || argument.description).join(' '));
  }
});

await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));

function send(method, params = {}) {
  return new Promise(resolve => {
    const id = nextId++;
    pending.set(id, resolve);
    socket.send(JSON.stringify({ id, method, params }));
  });
}

const targetId = process.argv[2] || 'skills';
const auditWidth = Number(process.argv[3] || 1440);
const auditHeight = Number(process.argv[4] || 900);
const reducedMotion = process.argv[5] === 'reduce';

await send('Runtime.enable');
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: auditWidth,
  height: auditHeight,
  deviceScaleFactor: 1,
  mobile: auditWidth < 600,
});
await send('Emulation.setEmulatedMedia', {
  features: [{ name: 'prefers-reduced-motion', value: reducedMotion ? 'reduce' : 'no-preference' }],
});
await send('Page.navigate', { url: `http://localhost:3012/?audit=${Date.now()}#${targetId}` });
await new Promise(resolve => setTimeout(resolve, 3500));

const result = await send('Runtime.evaluate', {
  expression: `JSON.stringify((() => {
    const target = document.querySelector('#${targetId}');
    const rect = element => { const value = element?.getBoundingClientRect(); return value && [value.x, value.y, value.width, value.height]; };
    return {
      href: location.href,
      title: document.title,
      rootChildren: document.querySelector('#root')?.childElementCount,
      scrollX,
      scrollY,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      viewport: [innerWidth, innerHeight],
      horizontalTrack: Boolean(document.querySelector('.home-horizontal-track')),
      targetRect: rect(target),
      headerRect: rect(target?.querySelector('[data-motion-header]')),
      cardRects: [...(target?.querySelectorAll('[data-card]') || [])].map(element => [rect(element), getComputedStyle(element).opacity]),
      splitDisplay: getComputedStyle(target?.querySelector('.home-split-panels') || document.body).display,
      textOpacity: getComputedStyle(target?.querySelector('[data-reveal-line]') || document.body).opacity,
      navOpacity: getComputedStyle(document.querySelector('.home-nav')).opacity
    };
  })())`,
  returnByValue: true,
});

console.log(JSON.stringify({ state: JSON.parse(result.result.result.value), runtimeErrors }));
socket.close();
