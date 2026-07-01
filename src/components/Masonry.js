import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Masonry.css";

const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);

  useEffect(() => {
  const handler = () => setValue(get);
  queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
  return () =>
    queries.forEach((q) =>
      matchMedia(q).removeEventListener("change", handler)
    );

  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = resolve;
        })
    )
  );
};

function Masonry({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.96,
  blurToFocus = true,
}) {
  const columns = useMedia(
    ["(min-width:1500px)", "(min-width:1000px)", "(min-width:650px)", "(min-width:400px)"],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    preloadImages(items.filter((i) => i.img).map((i) => i.img)).then(() =>
      setImagesReady(true)
    );
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    return items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const h = item.height / 2;
      const y = colHeights[col];

      colHeights[col] += h;

      return { ...item, x, y, w: columnWidth, h };
    });
  }, [columns, items, width]);

  const totalHeight = useMemo(() => {
    if (!grid.length) return 900;
    return Math.max(...grid.map((item) => item.y + item.h)) + 40;
  }, [grid]);

  const getInitialPosition = (item) => {
    if (animateFrom === "top") return { x: item.x, y: -200 };
    if (animateFrom === "left") return { x: -300, y: item.y };
    if (animateFrom === "right") return { x: window.innerWidth + 300, y: item.y };
    return { x: item.x, y: window.innerHeight + 200 };
  };

  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;

      if (!hasMounted.current) {
        const initial = getInitialPosition(item);

        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: initial.x,
            y: initial.y,
            width: item.w,
            height: item.h,
            filter: blurToFocus ? "blur(10px)" : "none",
          },
          {
            opacity: 1,
            x: item.x,
            y: item.y,
            width: item.w,
            height: item.h,
            filter: "blur(0px)",
            duration: 0.85,
            ease,
            delay: index * stagger,
          }
        );
      } else {
        gsap.to(selector, {
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          duration,
          ease,
          overwrite: "auto",
        });
      }
    });

    hasMounted.current = true;
 // eslint-disable-next-line react-hooks/exhaustive-deps
}, [grid, imagesReady, ease, duration, stagger, animateFrom, blurToFocus]);

  const handleEnter = (item) => {
    if (!scaleOnHover) return;
    gsap.to(`[data-key="${item.id}"]`, {
      scale: hoverScale,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = (item) => {
    if (!scaleOnHover) return;
    gsap.to(`[data-key="${item.id}"]`, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleClick = (item) => {
    if (item.url && item.url !== "#") {
      window.location.href = item.url;
    }
  };

  return (
    <div ref={containerRef} className="masonry-list" style={{ height: totalHeight }}>
      {grid.map((item) => (
        <div
          key={item.id}
          data-key={item.id}
          className={`masonry-item ${item.type === "main" ? "featured" : ""}`}
          onClick={() => handleClick(item)}
          onMouseEnter={() => handleEnter(item)}
          onMouseLeave={() => handleLeave(item)}
        >
          <div
            className={`masonry-card ${item.type}`}
            style={
              item.img
                ? { backgroundImage: `url(${item.img})` }
                : undefined
            }
          >
            {item.type === "main" && (
              <div className="masonry-overlay">
                <span>{item.number}</span>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
                <small>{item.cta}</small>
              </div>
            )}

            {item.type === "color" && (
              <div className="masonry-color-content">
                <h3>{item.title}</h3>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Masonry;