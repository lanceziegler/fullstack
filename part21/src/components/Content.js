import React from 'react';
import Part from './Part';

const Content = ({ parts }) => (
  <>
    {/* OLD WAY */}
    {/* <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} /> */}

    {/* NEW WAY */}
    {parts.map((part, i) => (
      <Part key={i} part={part}></Part>
    ))}
  </>
);

export default Content;
