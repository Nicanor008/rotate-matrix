var fs = require("fs");
const csv = require('csv-stream')
const { format } = require('@fast-csv/format');

// arguments to manipulate input csv stream
const options = {
  delimiter: ',',
  endLine: '\n',
  columns: ['id', 'data'],
  columnOffset: 1,
  escapeChar: '"',
  enclosedChar: '"'
}

// parse user input file
const csvStreamInput = csv.createStream(options);

// read user input
const args = process.argv;
const inputArgs = args[2];

// Format the output csv and print
const streamOutputData = format({ headers: true });
streamOutputData.pipe(process.stdout);

const inputFileExt = inputArgs.substring(inputArgs.length - 3, inputArgs.length);
if (!inputArgs || inputFileExt != "csv") {
  console.log("Input must be a CSV file. To learn more about CSV, read https://www.howtogeek.com/348960/what-is-a-csv-file-and-how-do-i-open-it/");
  return;
} else {
  // read input data and manipulate
  fs.createReadStream(inputArgs)
    .pipe(csvStreamInput)
    .on('error', (err) => {
      console.error('Error: ', err);
    })
    .on("data", (dataRow) => {
      try {
        const dataList = JSON.parse(dataRow.data)
        const length = dataList.length
        const id = { id: dataRow.id }
  
        /**
         * Rotate data
         * Number of rows and columns must be equal
         */
        if ((length % 2 === 0 && length !== 2) || length === 1 || (length % 3 === 0 && length !== 3)) {
          // convert data list to 2D multi-dimensional array
          const new2DArray = []
          while (dataList.length) {
            if (dataList.length === 4) new2DArray.push(dataList.splice(0, 2))
            else if (dataList.length % 5 === 0) new2DArray.push(dataList.splice(0, 5))
            else if (dataList.length % 6 === 0) new2DArray.push(dataList.splice(0, 6))
            else new2DArray.push(dataList.splice(0, 3))
          }
  
          // rotate table data
          rotateTable(new2DArray)
  
          // output data with the rotated data list
          streamOutputData.write({
            ...id,
            json: JSON.stringify([].concat(...new2DArray)),
            isValid: true
          })
        } else {
          // data list that can't be rotated
          streamOutputData.write({
            ...id,
            json: "[]",
            isValid: false
          })
        }
      } catch (error) {
        console.log('An Error occurred, please try again')
      }
    })
}

/**
 * 
 * rotate table data list
 * @param {Array} array
 */
function rotateTable(array) {
  let maxRow = array.length - 1;
  let maxCol = array.length - 1;
  let row = 0;
  let col = 0;

  while (row < maxRow && col < maxCol) {
    // Moving clockwise, retrieve the initial temp value(s)
    let previous = array[row + 1][col];

    // traverse through the first array column
    // swap the values
    for (let i = col; i <= maxCol; i++) {
      let current = array[row][i];
      array[row][i] = previous;
      previous = current;
    }
    row++;

    // traverse the second row through the right most column moving down
    for (let j = row; j <= maxRow; j++) {
      let current = array[j][maxCol];
      array[j][maxCol] = previous;
      previous = current;
    }
    maxCol--;

    // traverse the last row through to the left
    for (let j = maxCol; j >= col; j--) {
      let current = array[maxRow][j];
      array[maxRow][j] = previous;
      previous = current;
    }
    maxRow--;

    // And finally, traverse the left row through the left moving up
    for (let i = maxRow; i >= row; i--) {
      let current = array[i][col];
      array[i][col] = previous;
      previous = current;
    }
    col++;
  }
}
