//Asynchronous file reading with generators with generators

const fs = require('fs');

let fileName = process.argv[2];
readFile(fileName, chain(splitLines, numberLines, printLines));

function chain(...generatorFunctions) {
  if (generatorFunctions.length < 1) {
    throw new Error('Need at least one argument');
  }

  let generatorObject = generatorFunctions[generatorFunctions.length - 1]();
  generatorObject.next();

  for (let i = generatorFunctions.lenght - 2; i >= 0; i--) {
    let generatorFunction = generatorFunctions[i];

    generatorObject = generatorFunction(generatorObject);
    generatorObject.next();
  }

  return generatorObject;
}

function readFile(fileName, target) {
  let readStream = fs.createReadStream(fileName, {
    encoding: 'utf8',
    bufferSize: 1024
  });

  readStream.on('data', buffer => {
    let str = buffer.toString('utf8');
    target.next(str);
  });

  readStream.on('end', () => {
    target.return();
  });
}

function* splitLines(target) {
  let previous = '';
  try {
    while (true) {
      previous += yield;
      let eolIndex;

      while ((eolIndex = previous.indexOf('\n')) >= 0) {
        let line = previous.slice(0, eolIndex);
        target.next(line);
        previous = previous.slice(eolIndex + 1);
      }
    }
  } finally {
    if (previous.length > 0) {
      target.next(previous);
    }

    target.return();
  }
}

function* numberLines(target) {
  try {
    for (let lineNo = 0; ; lineNo++) {
      let line = yield;
      target.next(`${lineNo}: ${line}`);
    }
  } finally {
    target.return();
  }
}

function* printLines() {
  while(true) {
    let line = yield;
    console.log(line);
  }
}
