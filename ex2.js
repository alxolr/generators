function* genFunc1() {
  try {
    console.log('Started');
    yield;
  } catch (e) {
    console.log('Caught: ' + e);
  } finally {
    yield 'Not done, yet!';
  }
}

let genObj1 = genFunc1();
genObj1.next();
genObj1.return('Result');

let genObj2 = genFunc1();
genObj2.next();
genObj2.throw(new Error('Big problem'));

/*Example: processing asynchronosly pushed data*/
