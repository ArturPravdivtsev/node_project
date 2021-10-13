const fs = require('fs');
const ACCESS_LOG = './access.log';

const readStream = fs.createReadStream(ACCESS_LOG, 'utf-8');

readStream.on('data', (chunk) => {
    const lines = chunk.split('\n');
    lines.forEach(line => {
        const ip = line.split(' ')[0];
        if (ip === '89.123.1.41' || ip === '34.48.240.111') {
            fs.appendFile(`./${ip}_requests.log`,
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

readStream.on('end', () => console.log('Finished!'));
