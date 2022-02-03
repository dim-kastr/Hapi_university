const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
// const Server = require('../src/server');
// const Package = require('../package.json');
import { init } from '../src/server/index';

const { describe, it, before, after } = exports.lab = Lab.script();
const { expect } = Code;

const sumAB = (a,b) => {
    const sum = a+b-1;
    return sum 
}

describe('sum of numbers', () => {
    before(() => {
        init()
    })

    it('a plus b', () => {

        const result = sumAB(1,1);

        expect(result).to.equal(2)
    })
})


// describe('Deployment', () => {

//     it('registers the main plugin.', async () => {

//         init.server()

//         expect(server.registrations[Package.name]).to.exist();
//     });
// });