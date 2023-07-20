const expect = require('chai').expect;
const assert = require('chai').assert;

const page = require('../page/user-page.js');

const testCase = {
    "positive": {
        "UL_1": "UL_1 - (+) Default get user list",
        "UL_2": "UL_2 - (+) Fetch first page and per_page more than default",
        "UL_3": "UL_3 - (+) Fetch next page",
        "UL_4": "UL_4 - (+) Fetch another page and per_page more than default",
        "UL_5": "UL_5 - (+) Fetch another page and per_page less than default",
        "UL_6": "UL_6 - (+) Fetch user list more than default per_page (> 6) - exist data",
        "UL_7": "UL_7 - (+) Fetch user list less than default per_page (< 6)"
    },
    "negative": {
        "UL_8": "UL_8 - (-) Fetch another page with unexist data (no data)",
        "UL_9": "UL_9 - (-) Fetch another page with zero value",
        "UL_10": "UL_10 - (-) Fetch another page with negative value",
        "UL_11": "UL_11 - (-) Fetch another page with blank value",
        "UL_12": "UL_12 - (-) Fetch another page with non integer value",
        "UL_13": "UL_13 - (-) Fetch user list more than default per_page (> 6) - unexist data",
        "UL_14": "UL_14 - (-) Fetch user list less than default per_page (< 6) - negative value",
        "UL_15": "UL_15 - (-) Fetch user list less than default per_page (< 6) - zero value",
        "UL_16": "UL_16 - (-) Fetch user list with per_page blank value",
        "UL_17": "UL_17 - (-) Fetch user list with per_page non integer value"
    }
}

describe(`User List Test`, () => {
    const DEFAULT_SUCCESS_STATUS = 200
    const DEFAULT_PAGE = 1
    const DEFAULT_PER_PAGE = 6

    it(`${testCase.positive.UL_1}`, async function () {
        const response = await page.getUserList({});
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(DEFAULT_PAGE);
        expect(response.body.per_page).to.equal(DEFAULT_PER_PAGE);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.positive.UL_2}`, async function () {
        const zpage = 1;
        const per_page = 10

        const response = await page.getUserList({
            page : zpage,
            per_page : per_page
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(zpage);
        expect(response.body.per_page).to.equal(per_page);
        expect(response.body.data.length).to.equal(per_page);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.positive.UL_3}`, async function () {
        const zpage = 2;

        const response = await page.getUserList({
            page : zpage
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(zpage);
        expect(response.body.per_page).to.equal(DEFAULT_PER_PAGE);
        expect(response.body.data.length).to.equal(DEFAULT_PER_PAGE);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.positive.UL_4}`, async function () {
        const zpage = 2;
        const per_page = 7;

        const response = await page.getUserList({
            page : zpage,
            per_page : per_page
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(zpage);
        expect(response.body.per_page).to.equal(per_page);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.positive.UL_5}`, async function () {
        const zpage = 2;
        const per_page = 3;

        const response = await page.getUserList({
            page : zpage,
            per_page : per_page
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(zpage);
        expect(response.body.per_page).to.equal(per_page);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.positive.UL_6}`, async function () {
        const per_page = 7;

        const response = await page.getUserList({
            per_page : per_page
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(DEFAULT_PAGE);
        expect(response.body.per_page).to.equal(per_page);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.positive.UL_7}`, async function () {
        const per_page = 3;

        const response = await page.getUserList({
            per_page : per_page
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(DEFAULT_PAGE);
        expect(response.body.per_page).to.equal(per_page);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.negative.UL_8}`, async function () {
        const zpage = 1000;

        const response = await page.getUserList({
            page: zpage
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(zpage);
        expect(response.body.per_page).to.equal(DEFAULT_PER_PAGE);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.negative.UL_9}`, async function () {
        const zpage = 0;

        const response = await page.getUserList({
            page: zpage
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(DEFAULT_PAGE);
        expect(response.body.per_page).to.equal(DEFAULT_PER_PAGE);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.negative.UL_10}`, async function () {
        const zpage = -1;

        const response = await page.getUserList({
            page: zpage
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(DEFAULT_PAGE);
        expect(response.body.per_page).to.equal(DEFAULT_PER_PAGE);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.negative.UL_11}`, async function () {
        const zpage = "";

        const response = await page.getUserList({
            page: zpage
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(DEFAULT_PAGE);
        expect(response.body.per_page).to.equal(DEFAULT_PER_PAGE);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.negative.UL_12}`, async function () {
        const zpage = "a";

        const response = await page.getUserList({
            page: zpage
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(DEFAULT_PAGE);
        expect(response.body.per_page).to.equal(DEFAULT_PER_PAGE);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.negative.UL_13}`, async function () {
        const per_page = 1000;

        const response = await page.getUserList({
            per_page: per_page
        });
        total_data = response.body.total;
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(DEFAULT_PAGE);
        expect(response.body.per_page).to.equal(per_page);
        expect(response.body.data.length).to.equal(total_data);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.negative.UL_14}`, async function () {
        const per_page = -1;

        const response = await page.getUserList({
            per_page: per_page
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(DEFAULT_PAGE);
        expect(response.body.per_page).to.equal(DEFAULT_PER_PAGE);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.negative.UL_15}`, async function () {
        const per_page = 0;

        const response = await page.getUserList({
            per_page: per_page
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(DEFAULT_PAGE);
        expect(response.body.per_page).to.equal(DEFAULT_PER_PAGE);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.negative.UL_16}`, async function () {
        const per_page = "";

        const response = await page.getUserList({
            per_page: per_page
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(DEFAULT_PAGE);
        expect(response.body.per_page).to.equal(DEFAULT_PER_PAGE);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    it(`${testCase.negative.UL_17}`, async function () {
        const per_page = "a";

        const response = await page.getUserList({
            per_page: per_page
        });
        expect(response.status).to.equal(DEFAULT_SUCCESS_STATUS);
        expect(response.body.page).to.equal(DEFAULT_PAGE);
        expect(response.body.per_page).to.equal(DEFAULT_PER_PAGE);
        checkStructure(response.body.data);
        checkLengthOfData(response);
    });

    function checkStructure(data_payload) {
        const message = "property does not exist in data"
        const payloadKeys = ['id', 'email', 'first_name', 'last_name', 'avatar']
        for (let i = 0; i < data_payload.length; i++) {
            for (let j=0; j < payloadKeys.length; j++) {
                expect(data_payload[i].hasOwnProperty(payloadKeys[j])).to.equal(true, `${payloadKeys[j]} ${message}`);
            }
        }
    };

    function checkLengthOfData(response) {
        const currentDataLength = response.body.data.length;
        const totalData = response.body.total;
        const perPage = response.body.per_page;

        if (totalData >= perPage) {
            assert.isAtMost(currentDataLength, perPage);
        }

        if (totalData < perPage) {
            expect(currentDataLength).to.equal(totalData);
            assert.isBelow(currentDataLength, perPage);
        }
    }
});