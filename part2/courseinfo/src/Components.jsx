export const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export const Header = ({course}) => {
    return (
        <h1>{course}</h1>
    )
}

export const Content = ({parts}) => {
    return (
        <div>
            {
                parts.map(part => {
                    return <Part key={part.name} part={part.name} exercises={part.exercises} />
                })
            }
        </div>
    )
}

export const Part = ({part, exercises}) => {
    return (
        <p>
            {part} {exercises}
        </p>
    )
}

export const Total = ({parts}) => {
    return (
        <p><b>total of {parts.reduce(
            (accumulator, currentValue) => accumulator + currentValue.exercises, 0
        )} exercises</b></p>
    )
}