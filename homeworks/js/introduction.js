const averageGrade = (person) => {
    let sum = 0;
    for (let i = 0; i < person.grades.length; i++) {
        if (person.grades[i].score !== undefined && person.grades[i].score !== null) {
            sum += person.grades[i].score;
        }
    }
    const result = sum / person.grades.length;

    console.log(result);
}


averageGrade({
    name: 'Chill Student', grades: [
        {
            name: 'Math',
            score: 1,
        },
        {
            name: 'Science',
            score: 5
        },
        {
            name: 'Invalid Name',
            score: null
        },
        {
            name: 'Invalid Subject',
            score: undefined
        },
        {
            name: 'Biology',
            score: 10
        }]
});
