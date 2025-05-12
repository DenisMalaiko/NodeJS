const averageGrade = (person) => {
    const grades = person?.grades;
    const result = grades
        .filter(grade => grade.score)
        .reduce((acc, grade) => acc + grade.score, 0);

    console.log(result / grades.length)
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
