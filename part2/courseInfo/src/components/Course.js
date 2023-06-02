import React from 'react';
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = (props) => {
  console.log(props);
  const { course } = props;
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <div style={{ fontWeight: 'bold' }}>
        <Total parts={course.parts} />
      </div>
    </div>
  );
};

export default Course;
