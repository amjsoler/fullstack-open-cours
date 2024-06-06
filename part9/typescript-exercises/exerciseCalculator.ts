const calculateExercises = (daily_exercises: Array<number>, target: number): Result => {
    const average = daily_exercises.reduce((a, b) => a + b, 0) / daily_exercises.length;
    const periodLength = daily_exercises.length;
    const targetReached = average >= target;
    const rating = average < target ? 1 : average === target ? 2 : 3;
    const ratingDescription = rating === 1 ? 'You need to exercise more' : rating === 2 ? 'You reached your target' : 'You are doing great';
    const success = average >= target;
    return {
        periodLength,
        trainingDays: daily_exercises.filter(d => d > 0).length,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}

type Result = {
    periodLength:number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))