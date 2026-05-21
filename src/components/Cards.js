import React from 'react';
import './Cards.css';
import CardItem from './Carditem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check Out My Work!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Explore The various Projects Ive Completed'
              label='Projects'
              path='/projects'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Take A Look through My Journey In The Arts'
              label='Design'
              path='/graphicdesign'
            />
            <CardItem
              src='images/img-5.jpg'
              text='Look At The Cool Pics I took Over The Years'
              label='Photos'
              path='/photography'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;