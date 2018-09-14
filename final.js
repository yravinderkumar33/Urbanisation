const fs = require('fs');

const readableStream = fs.createReadStream('./Indicators.csv');
const countryName = 0;
const indicatorName = 2;
const year = 4;
const value = 5;
const indianData = [];
let finalData = [];
const resultant = [];
const startYear = 1960;
const endYear = 2015;
const country = 'India';
readableStream.setEncoding('utf8');
// reading of streams starts here
readableStream.on('data', (chunk) => {
  const lines = chunk.split('\n');
  filteration(lines, country, startYear, endYear);
});


// filteration function
function filteration(lines, country, startYear, endYear) {
  lines.forEach((current) => {
    const currentCountry = current.split(',');
    if (currentCountry[countryName] === country) {
      if (currentCountry[year] >= startYear && currentCountry[year] <= endYear) {
        const obj = {
          country: currentCountry[countryName],
          indicator: currentCountry[indicatorName],
          yr: currentCountry[year],
          val: currentCountry[value],
        };
        indianData.push(obj);
      }
    }
  });


  // filteration based on indicators value
  if (country === 'India') {
    finalData = indianData.filter((elements) => {
      if (elements.indicator.includes('Urban population (% of total') || elements.indicator.includes('Rural population (% of total populat') || elements.indicator.includes('Urban population growth (annual') || elements.indicator === 'Urban population' || elements.indicator === 'Rural population') {
        return true;
      }
    });
  } else if (country === 'South Asia') {
    finalData = indianData.filter((elements) => {
      if (elements.indicator.includes('Rural population') || elements.indicator.includes('Urban population')) {
        return true;
      }
    });
  }
}


// filteration process ends here
// this function writes the json objects
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

// function ends here
// starts when the no more data is available for the stream to parse;
readableStream.on('end', () => {
  console.log(indianData.length);
  //   console.log(finalData.length);

  for (let i = startYear; i < endYear; i++) {
    const result = finalData.reduce((final, current) => {

      if (current.yr === 1982) {
        final["Rural population (% of total population)"] = 77.8;
      }

      if (current.yr == i) {
        if (current.indicator.includes('Urban population (% of total')) {
          final[current.indicator] = current.val;
        } else if (current.indicator.includes('Rural population (% of total populat')) {
          final[current.indicator] = current.val;
        } else if (current.indicator.includes('Urban population growth (annual')) {
          final[current.indicator] = current.val;
        } else if (current.indicator === 'Urban population') {
          final[current.indicator] = current.val;
        } else if (current.indicator === 'Rural population') {
          final[current.indicator] = current.val;
        }
      }
      return final;
    }, { year: i, country });

    resultant.push(result);
  }

  writeToFile(`output/${country}.json`, resultant);
});

// function ends here
