#!/usr/local/bin/node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const files = [];

function ThroughDirectory(directory) {
    fs.readdirSync(directory).forEach(File => {
        const absolute = path.join(directory, File);
        if (fs.statSync(absolute).isDirectory()) return ThroughDirectory(absolute);
        else return files.push(absolute);
    });
}

inquirer.prompt([
    {
        name: 'path',
        type: 'input', // input, number, confirm, list, checkbox, password
        message: 'Enter directory path'
    },
    {
        name: 'pattern',
        type: 'input', // input, number, confirm, list, checkbox, password
        message: 'Enter a string/pattern'
    }
])
    .then(answer => {
        ThroughDirectory(path.join(process.cwd(), answer.path));
        const regexp = new RegExp(answer.pattern)
        files.forEach((filePath) => {
            console.log(filePath);
            const readStream = fs.createReadStream(filePath, 'utf-8');
            readStream.on('data', (chunk) => {
                const lines = chunk.split('\n');
                lines.forEach(line => {
                    const result = line.match(regexp);
                    console.log(result);
                    if (result) {
                        fs.appendFile(`${process.cwd()}/${result[0]}_requests.log`,
                            `${line}\n`,
                            {
                                encoding: 'utf-8',
                            },
                            (err) => {
                                if (err) console.log(err);
                            }
                        );
                    }
                });
            });
        })
    })