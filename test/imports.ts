import * as mocha from 'mocha';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;

export {
    mocha,
    chai,
    expect, assert,
};