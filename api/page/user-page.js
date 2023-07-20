const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.REQRES_BASE_URL);

const getUserList = (query) => api.get('/api/users')
 .set('Content-Type', 'application/json')
 .set('Accept', 'application/json')
 .query(query)

const getUserDetail = (id) => api.get(`/api/users/${id}`)
.set('Content-Type', 'application/json')
.set('Accept', 'application/json')

const deleteUserDetail = (id) => api.delete(`/api/users/${id}`)
 .set('Content-Type', 'application/json')
 .set('Accept', 'application/json')

 const putUserUpdateDetail = (id, payload) => api.put(`/api/users/${id}`)
 .set('Content-Type', 'application/json')
 .set('Accept', 'application/json')
 .send(payload)

module.exports = {
    getUserList,
    getUserDetail,
    deleteUserDetail,
    putUserUpdateDetail
}