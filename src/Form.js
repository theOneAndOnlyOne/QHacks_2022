import React from 'react';
import Genre from './Genre';
import data from './data';

export default function Form() {
  const [selectedGenre, setSelectedGenre] = React.useState('hip-hop');

  const genres = data;

  function handleClick(name) {
    console.log(name);
    setSelectedGenre(name);
  }

  const buttons = genres.map((genre) => {
    return (
      
      <Genre
        key={genre}
        name={genre}
        isHeld={selectedGenre === genre ? true : false}
        handleClick={handleClick}
      />
    );
  });

  return <div className='grid-container'>{buttons}</div>;
}
