function* take(n, iterable) {
  for (let x of iterable) {
    if (n <= 0) return;
    n--;
    yield x;
  }
}

let arr = ['a', 'b', 'c', 'd'];
for (let x of take(2, arr)) {
  console.log(x);
}

function* naturalNumbers() {
  for (let n = 0;; n++) {
    yield n;
  }
}

for (let x of take(3, naturalNumbers())) {
  console.log(x);
}

function* map(iterable, mapFunc) {
  for (let x of iterable) {
    yield mapFunc(x);
  }
}

let arr2 = [...take(15, map(naturalNumbers(), x => x * x))];

console.log(arr2);

function* filter(iterable, filterFunc) {
  for (let x of iterable) {
    if (filterFunc(x)) {
      yield x;
    }
  }
}

let arr3 = [...take(5, filter(arr2, x => (x % 2) === 0))];

console.log(arr3);

const primeNumbers = require('./prime-numbers');

let n = 100;

for (let x of primeNumbers) {
  if (n >= 0) {
    console.log(`Number: ${x}`);
    n--;
  } else {
    return;
  }
}
