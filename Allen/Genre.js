import React from 'react';

export default function Genre(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'gray',
  };

  return (
    <h2
      className='genre-btn'
      style={styles}
      onClick={() => props.handleClick(props.name)}
    >
      {props.name}
    </h2>
  );
}
