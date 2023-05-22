import React from 'react';

const Total = ({ parts }) => (
  <>
    {`total: ${parts.reduce((sum, part) => sum + part.exercises, 0)}
      exercises`}
  </>
);

export default Total;
