const fs = require('fs');

const readableStream = fs.createReadStream('./Indicators.csv');
const result1 = [];
const result2 = [];
const result3 = [];
const result4 = [];
const result5 = [];
const asianCountries = [];
// index values inside the csv files;
const countryName = 0;
const indicatorName = 2;
const year = 4;
const value = 5;
readableStream.setEncoding('utf8');

// creates JSON objects and writes into array result

function createJSON(line) {
  const elements = line.split(',');

  // console.log(elements[0])
  if (elements[countryName] === 'India') {
    if (elements[year] >= 1960 && elements[year] <= 2015) {
      if (elements[indicatorName].includes('Urban population (% of total')) {
        const obj = {
          country: elements[countryName].trim(),
          indicator: elements[indicatorName].trim(),
          yr: elements[year].trim(),
          val: elements[value].trim(),
        };

        result1.push(obj);
      } else if (elements[indicatorName].includes('Rural population (% of total populat')) {
        const obj = {
          country: elements[countryName].trim(),
          indicator: elements[indicatorName].trim(),
          yr: elements[year].trim(),
          val: elements[value].trim(),
        };

        result4.push(obj);
      } else if (elements[indicatorName].includes('Urban population growth (annual')) {
        const obj = {
          country: elements[countryName].trim(),
          indicator: elements[indicatorName].trim(),
          yr: elements[year].trim(),
          val: elements[value].trim(),
        };

        result2.push(obj);
      } else if (elements[indicatorName] === 'Urban population') {
        const obj = {
          country: elements[countryName].trim(),
          indicator: elements[indicatorName].trim(),
          yr: elements[year].trim(),
          val: elements[value].trim(),
        };
        result3.push(obj);
      } else if (elements[indicatorName] === 'Rural population') {
        const obj = {
          country: elements[countryName].trim(),
          indicator: elements[indicatorName].trim(),
          yr: elements[year].trim(),
          val: elements[value].trim(),
        };
        result5.push(obj);
      }
    }
  } else if (elements[countryName].includes('Asia') && elements[year] === 2013) {
    asianCountries.push(line);
  }
}


readableStream.on('data', (chunk) => {
  const lines = chunk.split('\n');
  lines.forEach((line) => {
    createJSON(line);
  });
});


function writeToFile(filename, result) {
  const json = JSON.stringify(result);
  fs.writeFile(filename, json, 'utf8', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('json file saved successfully');
    }
  });
}

readableStream.on('end', () => {
  writeToFile('part1.json', result1);
  writeToFile('part2.json', result2);
  writeToFile('part3.json', result3);
  writeToFile('part4.json', result4);
  writeToFile('part5.json', result5);
  console.log(result1.length);
  console.log(result2.length);
  console.log(result3.length);
  console.log(result4.length);
  console.log(result5.length);
});
