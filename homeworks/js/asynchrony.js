function createPromise(time, message) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(message);
        }, time);
    });
}

const promise1 = createPromise(1000, 'First promise resolved after 1 second');
const promise2 = createPromise(2000, 'Second promise resolved after 2 seconds');
const promise3 = createPromise(3000, 'Third promise resolved after 3 seconds');

Promise.all([promise1, promise2, promise3]).then((results) => {
    console.log(results);
});