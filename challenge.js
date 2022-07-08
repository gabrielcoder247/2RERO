'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'roadsAndLibraries' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER c_lib
 *  3. INTEGER c_road
 *  4. 2D_INTEGER_ARRAY cities
 */

// Complete the roadsAndLibraries function below.
const roadsAndLibraries = (n, c_lib, c_road, cities) => {
    if (c_road >= c_lib)
        return n * c_lib;
    else {
        let visitedc = [n + 1];

        let adjCities = [n + 1];
        console.log(adjCities)
        let connectedComps = 0;
        for (let i = 0; i < cities.length; i++) {
            if (!adjCities[cities[i][0]])
                adjCities[cities[i][0]] = []
            if (!adjCities[cities[i][1]])
                adjCities[cities[i][1]] = []

            adjCities[cities[i][0]].push(cities[i][1])
            adjCities[cities[i][1]].push(cities[i][0])
        }

        for (let j = 1; j < n + 1; j++) {
            if (!visitedc[j]) {
                dfs(j, adjCities, visitedc);
                connectedComps++
            }
        }
        // return c_lib*connectedComps + c_road*(n-connectedComps);
        return c_lib * connectedComps + c_road * (n - connectedComps);

    }

}
const dfs = (city, adjcities, visitedc) => {
    if (visitedc[city] = true) {
        for (let i = 0; Array.isArray(adjcities[city]) && i < adjcities[city].length; i++) {
            if (!visitedc[adjcities[city][i]])
                dfs(adjcities[city][i], adjcities, visitedc);
        }
    }
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        const c_lib = parseInt(firstMultipleInput[2], 10);

        const c_road = parseInt(firstMultipleInput[3], 10);

        let cities = Array(m);

        for (let i = 0; i < m; i++) {
            cities[i] = readLine().replace(/\s+$/g, '').split(' ').map(citiesTemp => parseInt(citiesTemp, 10));
        }

        const result = roadsAndLibraries(n, c_lib, c_road, cities);

        ws.write(result + '\n');
    }

    ws.end();
}