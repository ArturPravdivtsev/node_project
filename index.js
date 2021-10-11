const colors = require('colors');

function isAN(value) {
    if (value instanceof Number)
        value = value.valueOf();

    return isFinite(value) && value === parseInt(value, 10);
}

function chunkArray(array, size) {
    let subarray = [];
    for (let i = 0; i < array.length; i += size) {
        subarray.push(array.slice(i, i + size));
    }
    return subarray;
}

function isPrime(num) {
    for (let i = 2, max = Math.sqrt(num); i <= max; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return num > 1;
}

function getPrimes(min, max) {
    const primes = [];

    for (let i = min; i <= max; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }

    if (primes.length < 1) console.log(colors.red('Простых чисел в заданном диапазоне не обнаружено!'));

    return primes;
}

function setColors(numbers) {
    numbers.map((number) => {
        number.map((num, idx) => {
            if ((idx + 1) % 2 === 0) {
                console.log(colors.yellow(num));
            } else if ((idx + 1) % 3 === 0) {
                console.log(colors.red(num));
            } else {
                console.log(colors.green(num));
            }
        })
    })
}

if (!Number.isInteger(+process.argv[2]) || !Number.isInteger(+process.argv[3])) {
    return console.log(colors.red('Аргументы должны быть числами!'));
}
const primesArr = getPrimes(process.argv[2], process.argv[3]);
setColors(chunkArray(primesArr, 3));
