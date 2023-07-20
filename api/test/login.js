const expect = require('chai').expect;

const page = require('../page/login-page.js');

const testCase = {
    "positive": {
        "LO_1": "LO_1 - (+) Normal login (correct credential)"
    },
    "negative": {
        "LO_2": "LO_2 - (-) Valid exist email, invalid password",
        "LO_3": "LO_3 - (-) Unexist email, valid password",
        "LO_4": "LO_4 - (-) Unexist email, invalid password",
        "LO_5": "LO_5 - (-) Without email payload",
        "LO_6": "LO_6 - (-) without password payload",
        "LO_7": "LO_7 - (-) blank payload"
    }
};

describe(`Login Test`, () => {
    function checkStructure(data_payload) {
        const message = "property does not exist in data"
        expect(data_payload.hasOwnProperty('token')).to.equal(true, `token ${message}`);
    };
});


