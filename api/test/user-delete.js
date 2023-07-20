const expect = require('chai').expect;

const page = require("../page/user-page.js");

const testCase = {
    "positive": {
        "UD_1": "UD_1 - (+) Normal delete user (exist id)"

    },
    "negative": {
        "UD_2": "UD_2 - (-) Delete user by unexist ID",
        "UD_3": "UD_3 - (-) Delete user by non-integer ID",
        "UD_4": "UD_4 - (-) Delete user by blank ID",
        "UD_5": "UD_5 - (-) Delete user by minus ID",
        "UD_6": "UD_6 - (-) Delete user by zero ID",
    }
};

describe(`User Delete Test`, () => {
    it(`${testCase.positive.UD_1}`, async function() {
        const response = await page.deleteUserDetail(1)
        expect(response.status).to.equal(204)
        expect(response.body).to.deep.equal({})
    });

    it(`${testCase.negative.UD_2}`, async function() {
        const response = await page.deleteUserDetail(100003)
        expect(response.status).to.equal(404)
    });

    it(`${testCase.negative.UD_3}`, async function() {
        const response = await page.deleteUserDetail("a")
        expect(response.status).to.equal(404)
    });

    it(`${testCase.negative.UD_4}`, async function() {
        const response = await page.deleteUserDetail("")
        expect(response.status).to.equal(404)
    });

    it(`${testCase.negative.UD_5}`, async function() {
        const response = await page.deleteUserDetail(-1)
        expect(response.status).to.equal(404)
    });

    it(`${testCase.negative.UD_5}`, async function() {
        const response = await page.deleteUserDetail(0)
        expect(response.status).to.equal(404)
    });
});
