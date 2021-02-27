require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

const { getReviews } = require('../lib/mungingFunctions.js');

describe('app routes', () => {
  describe('routes', () => {
    let token;

    beforeAll(async done => {
      execSync('npm run setup-db');

      client.connect();

      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });

      token = signInData.body.token; // eslint-disable-line

      return done();
    });

    afterAll(done => {
      return client.end(done);
    });

    // test('returns animals', async () => {

    //   const expectation = [
    //     {
    //       name: 'Luc Lac',
    //       image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg',
    //       price: '$$',
    //       rating: 4.0,
    //       url: 'https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=CQE1JjgHx0oM_A9JTQhg7A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CQE1JjgHx0oM_A9JTQhg7A',
    //     }
    //   ];

    //   getReviews();

    //   const data = await fakeRequest(app)
    //     .get('/animals')
    //     .expect('Content-Type', /json/)
    //     .expect(200);

    //   expect(data.body).toEqual(expectation);
    // });

    // test('returns animals', async() => {

    //   const expectation = [
    //     {
    //       'id': 1,
    //       'name': 'bessie',
    //       'coolfactor': 3,
    //       'owner_id': 1
    //     },
    //     {
    //       'id': 2,
    //       'name': 'jumpy',
    //       'coolfactor': 4,
    //       'owner_id': 1
    //     },
    //     {
    //       'id': 3,
    //       'name': 'spot',
    //       'coolfactor': 10,
    //       'owner_id': 1
    //     }
    //   ];

    //   const data = await fakeRequest(app)
    //     .get('/animals')
    //     .expect('Content-Type', /json/)
    //     .expect(200);

    //   expect(data.body).toEqual(expectation);
    // });

    // test('returns animals', async() => {

    //   const expectation = [
    //     {
    //       'id': 1,
    //       'name': 'bessie',
    //       'coolfactor': 3,
    //       'owner_id': 1
    //     },
    //     {
    //       'id': 2,
    //       'name': 'jumpy',
    //       'coolfactor': 4,
    //       'owner_id': 1
    //     },
    //     {
    //       'id': 3,
    //       'name': 'spot',
    //       'coolfactor': 10,
    //       'owner_id': 1
    //     }
    //   ];

    //   const data = await fakeRequest(app)
    //     .get('/animals')
    //     .expect('Content-Type', /json/)
    //     .expect(200);

    //   expect(data.body).toEqual(expectation);
    // });

  });
});
