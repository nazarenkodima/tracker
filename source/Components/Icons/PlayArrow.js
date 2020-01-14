import React from 'react';

const SvgPlayArrow = (props) => {
  return (
    <svg width={20} height={20} {...props} fill='white'>
      <path d="M8 5v14l11-7z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
};

export default SvgPlayArrow;

