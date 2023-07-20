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
    it(`${testCase.positive.LO_1}`, async function() {
        const response = await page.postLogin({
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        });
        expect(response.status).equal(200);
        checkStructure(response.body);
    });

    it(`${testCase.negative.LO_2}`, async function() {
        const response = await page.postLogin({
            email: "eve.holt@reqres.in",
            password: "asd"
        });
        expect(response.status).equal(400);
        expect(response.body).to.deep.equal({});
    });

    it(`${testCase.negative.LO_3}`, async function() {
        const response = await page.postLogin({
            email: "yuri@reqres.in",
            password: "cityslicka"
        });
        expect(response.status).equal(400);
        expect(response.body.error).to.equal("user not found");
    });

    it(`${testCase.negative.LO_4}`, async function() {
        const response = await page.postLogin({
            email: "yuri@reqres.in",
            password: "asd"
        });
        expect(response.status).equal(400);
        expect(response.body.error).to.equal("user not found");
    });

    it(`${testCase.negative.LO_5}`, async function() {
        const response = await page.postLogin({
            password: "asd"
        });
        expect(response.status).equal(400);
        expect(response.body.error).to.equal("Missing email or username");
    });

    it(`${testCase.negative.LO_6}`, async function() {
        const response = await page.postLogin({
            email: "eve.holt@reqres.in"
        });
        expect(response.status).equal(400);
        expect(response.body.error).to.equal("Missing password");
    });

    it(`${testCase.negative.LO_7}`, async function() {
        const response = await page.postLogin({});
        expect(response.status).equal(400);
        expect(response.body.error).to.equal("Missing email or username");
    });

    function checkStructure(data_payload) {
        const message = "property does not exist in data"
        expect(data_payload.hasOwnProperty('token')).to.equal(true, `token ${message}`);
    };
});


