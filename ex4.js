function* callee() {
  try {
    yield 'b';
    yield 'c';
  } finally {
    console.log('finally callee');
  }
}

function* caller() {
  try {
    yield 'a';
    yield* callee();
    yield 'd';
  } finally {
    console.log('finally caller');
  }
}

let [x, y] = caller(); //['a', 'b']
