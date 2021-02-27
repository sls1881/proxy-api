require('dotenv').config();

const { formatReviews } = require('../lib/mungingFunctions.js');

describe('app routes', () => {
  describe('routes', () => {

    //Get review function
    test('It should return a review from yelp', () => {

      const expectation = [
        {
          name: 'Luc Lac',
          image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg',
          price: '$$',
          rating: 4.0,
          url: 'https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=CQE1JjgHx0oM_A9JTQhg7A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CQE1JjgHx0oM_A9JTQhg7A',
        }
      ];

      const actual = {
        "businesses": [
          {
            "id": "Ys42wLKqrflqmtqkgqOXgA",
            "alias": "luc-lac-portland-7",
            "name": "Luc Lac",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=CQE1JjgHx0oM_A9JTQhg7A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CQE1JjgHx0oM_A9JTQhg7A",
            "review_count": 3205,
            "categories": [
              {
                "alias": "vietnamese",
                "title": "Vietnamese"
              },
              {
                "alias": "tapasmallplates",
                "title": "Tapas/Small Plates"
              },
              {
                "alias": "cocktailbars",
                "title": "Cocktail Bars"
              }
            ],
            "rating": 4.0,
            "coordinates": {
              "latitude": 45.516868,
              "longitude": -122.675447
            },
            "transactions": [
              "pickup",
              "delivery"
            ],
            "price": "$$",
            "location": {
              "address1": "835 SW 2nd Ave",
              "address2": null,
              "address3": "",
              "city": "Portland",
              "zip_code": "97204",
              "country": "US",
              "state": "OR",
              "display_address": [
                "835 SW 2nd Ave",
                "Portland, OR 97204"
              ]
            },
            "phone": "+15032220047",
            "display_phone": "(503) 222-0047",
            "distance": 1312.1776320869053
          }
        ]
      };

      const data = formatReviews(actual);

      expect(data).toEqual(expectation);
    });



  });
});
