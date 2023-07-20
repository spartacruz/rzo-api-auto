const supertest = require("supertest")
const env = require('dotenv').config();

const api = supertest(process.env.REQRES_BASE_URL);

const postLogin = (query) => api.post("/api/login")
 .set('Content-Type', 'application/json')
 .set('Accept', 'application/json')
 .send(query)

module.exports = {
    postLogin
}