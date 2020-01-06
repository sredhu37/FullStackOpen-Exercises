import React from 'react';

const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    );
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    );
}

const Content = (props) => {
    return (
        <>
            {props.parts.map(part => <Part key={part.id} part={part} />)}
        </>
    );
}

const Total = (props) => {
    return (
        <p><b>Total of {props.parts.reduce(((total, part) => total + part.exercises), 0)} exercises</b></p>
    );
}

const Course = (props) => {
    const course = props.course;

    return(
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}

export default Course;
