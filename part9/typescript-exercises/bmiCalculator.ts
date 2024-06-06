const calculateBmi = (height: number, weight: number): string => {
    height = process.argv[2] ? Number(process.argv[2]) : height;
    weight = process.argv[3] ? Number(process.argv[3]) : weight;

    if (isNaN(height) || isNaN(weight)) {
        throw new Error('Provided values were not numbers!');
    }

    const bmi = weight / Math.pow(height / 100, 2);
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
}

export default calculateBmi