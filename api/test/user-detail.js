const expect = require('chai').expect;

const page = require("../page/user-page.js");

const testCase = {
    "positive": {
        "UG_1": "UG_1 - (+) Normal get user by ID"
    },
    "negative": {
        "UG_2": "UG_2 - (-) Get user by unexist ID",
        "UG_3": "UG_3 - (-) Get user by non-integer ID",
        "UG_4": "UG_4 - (-) Get user by blank ID",
        "UG_5": "UG_5 - (-) Get user by minus ID",
        "UG_6": "UG_6 - (-) Get user by zero ID"
    }
};

describe(`User Detail Test`, () => {
    const DEFAULT_USER_ID = 1
    it(`${testCase.positive.UG_1}`, async function(){
        const response = await page.getUserDetail(DEFAULT_USER_ID);
        expect(response.status).to.equal(200);
        checkStructure(response.body.data);
    });

    it(`${testCase.negative.UG_2}`, async function(){
        const response = await page.getUserDetail(1230);
        expect(response.status).to.equal(404);
        expect(response.body).to.deep.equal({});
    });

    it(`${testCase.negative.UG_3}`, async function(){
        const response = await page.getUserDetail("a");
        expect(response.status).to.equal(404);
        expect(response.body).to.deep.equal({});
    });

    //not counted
    it.skip(`${testCase.negative.UG_4}`, async function(){
        const response = await page.getUserDetail("");
        expect(response.status).to.equal(404);
        expect(response.body).to.deep.equal({});
    });

    it(`${testCase.negative.UG_5}`, async function(){
        const response = await page.getUserDetail(-1);
        expect(response.status).to.equal(404);
        expect(response.body).to.deep.equal({});
    });

    it(`${testCase.negative.UG_6}`, async function(){
        const response = await page.getUserDetail(0);
        expect(response.status).to.equal(404);
        expect(response.body).to.deep.equal({});
    });


    function checkStructure(data_payload) {
        const message = "property does not exist in data"
        const payloadKeys = ['id', 'email', 'first_name', 'last_name', 'avatar']
        for (j=0; j < payloadKeys.length; j++) {
            expect(data_payload.hasOwnProperty(payloadKeys[j])).to.equal(true, `${payloadKeys[j]} ${message}`);
        }        
    };
});