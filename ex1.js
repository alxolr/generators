class BinaryTree {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  * [Symbol.iterator]() {
    yield this.value;

    if (this.left) {
      yield * this.left;
    }

    if (this.right) {
      yield * this.right;
    }
  }
}

let tree = new BinaryTree('a', new BinaryTree('b',
  new BinaryTree('c'), new BinaryTree('d')), new BinaryTree('e'));

for (let x of tree) {
  console.log(x);
}


function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';
}

let genObj = dataConsumer();
genObj.next();
genObj.next('a');
genObj.next('b');


function coroutine(generatorFunction) {
  return function(...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();

    return generatorObject;
  };
}

const wrapped = coroutine(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});

const normal = function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
};

wrapped().next('hello');

let genObj2 = normal();
genObj2.next();
genObj2.next('hello');
