const expect = require('chai').expect;

const page = require('../page/user-page.js');

const testCase = {
    "positive": {
        "UU_1": "UU_1 - (+) Normal update to exist user",
        "UU_3": "UU_3 - (+) Update email only",
        "UU_4": "UU_4 - (+) Update first_name only",
        "UU_5": "UU_5 - (+) Update last_name only"
    },
    "negative": {
        "UU_2": "UU_2 - (-) Update to non-exist user",
        "UU_6": "UU_6 - (-) Blank body ({})",
        "UU_7": "UU_7 - (-) Without id"
    }
};

describe("User Detail Update Test", () => {

    async function getUserDetail(userId) {
        const response = await page.getUserDetail(userId);
        return response;
    };

    async function updateValidation(options) {
        if (typeof options.isUpdate === 'undefined') {
            options.isUpdate = true;
        };

        if (options.isUpdate == false) {
            beforeUpdateResponse = options.beforeUpdate.body.data;
            updateDataKeys = Object.keys(beforeUpdateResponse);

            for (i = 0; i < updateDataKeys.length; i++) {
                expect(beforeUpdateResponse[updateDataKeys[i]]).to.equal(afterUpdateResponse[updateDataKeys[i]], 
                    `${updateDataKeys[i]} should not updated`);
            };
        } else { //isUpdate == true
            afterUpdateResponse = options.afterUpdate.body.data
            updateDataKeys = Object.keys(options.payloadData)
            for (i = 0; i < updateDataKeys.length; i++) {
                expect(afterUpdateResponse[updateDataKeys[i]]).to.equal(options.payloadData[updateDataKeys[i]], 
                    `${updateDataKeys[i]} is not updated`);
            };
        };
    };

    async function checkResponse(options) {
        (payloadKeys) = Object.keys(options.payload);
        for (i = 0; i < payloadKeys.length; i++) {
            expect(options.response.body[payloadKeys[i]]).to.be.equal(options.payload[payloadKeys[i]])
        };
        payloadKeys.push("updatedAt");
        expect(options.response.body).have.keys(payloadKeys);
    };
});