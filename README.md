## Problem Statement
Implement a simple program that rotates a table with an identical number of rows and columns to the left or right.
It should expose a CLI as outlined in the next section and accept a CSV file containing a list of lists of numbers, and output a CSV-encoded version of the correct — and correctly — rotated tables.

## Requirements
- Node.js atleast v12 or higher

## Tools Used
- Node.js v14.19.3
- Yarn v1.22.17
- JavaScript
- csv-stream
- fast-csv

## How to Test and Run
- Clone this repo and `cd` into it
- on the terminal, run `yarn` to install dependencies
- To test, run `node cli.js input.csv > output.csv`
- check the `output.csv` file the output
- You can change the input data in the `input.csv` file and compare it with the output file

## Unit Tests
No unit tests were written here for now.

## Edge cases handled during manual testing
I did a manual testing with running `node cli.js input.csv > output.csv`. The edge cases capture include:
- Ensuring the rotated table is a square or a rectangle
- Captured unexpected errors using try...catch
- Tested small datasets and large datasets

## Evidence
![images](/assets/evidence.png)

## Some of the future improvements
- Write unit tests
- Refactor how to convert 1D list to 2D list
- Capture dynamically direction to rotate the table

## Author
[Nicanor Korir](http://nicanor.me)
