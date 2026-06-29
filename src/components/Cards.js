import React from 'react';
import './Cards.css';
import CardItem from './Carditem';

function Cards() {
  return (
    <div className='cards' id='work'>
      <h1>CREATIVE ARCHIVE</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-4.jpg'
              text='Photography, graphic design, and visual storytelling'
              label='Gallery'
              path='/gallery'
            />
            <CardItem
              src='images/img-3.jpg'
              text='Creative coding, web experiments, and interactive builds'
              label='Projects'
              path='/projects'
            />
            <CardItem
              src='images/img-5.jpg'
              text='A little more about me, my style, and what I am building'
              label='About'
              path='/about'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;