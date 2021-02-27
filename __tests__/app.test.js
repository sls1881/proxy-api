require('dotenv').config();

const { formatReviews, formatLocation, formatWeather } = require('../lib/mungingFunctions.js');

describe('app routes', () => {
  describe('routes', () => {

    //Test location function
    test('It should return a location', () => {

      const expectation = {
        'formatted_query': 'Portland, Multnomah County, Oregon, USA',
        'latitude': '45.5202471',
        'longitude': '-122.6741949',
      };

      const actual = [
        {
          'place_id': '282983083',
          'licence': 'https://locationiq.com/attribution',
          'osm_type': 'relation',
          'osm_id': '186579',
          'boundingbox': [
            '45.432536',
            '45.6528812',
            '-122.8367489',
            '-122.4720252'
          ],
          'lat': '45.5202471',
          'lon': '-122.6741949',
          'display_name': 'Portland, Multnomah County, Oregon, USA',
          'class': 'place',
          'type': 'city',
          'importance': 0.75356571743377,
          'icon': 'https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png'
        },
      ];

      const data = formatLocation(actual);

      expect(data).toEqual(expectation);
    });

    //Test weather function
    test('It should return weather', () => {

      const expectation = [
        {
          forecast: 'Light snow',
          time: '2/27/2021',
        }
      ];

      const actual = {
        data: [
          {
            'moonrise_ts': 1614474896,
            'wind_cdir': 'W',
            'rh': 97,
            'pres': 899.833,
            'high_temp': -0.2,
            'sunset_ts': 1614477217,
            'ozone': 368.833,
            'moon_phase': 0.974704,
            'wind_gust_spd': 13.7969,
            'snow_depth': 78.1,
            'clouds': 78,
            'ts': 1614412860,
            'sunrise_ts': 1614437297,
            'app_min_temp': -8.3,
            'wind_spd': 4.3086,
            'pop': 90,
            'wind_cdir_full': 'west',
            'slp': 1025.08,
            'moon_phase_lunation': 0.55,
            'valid_date': '2021-02-27',
            'app_max_temp': -5.1,
            'vis': 7.8405,
            'dewpt': -2,
            'snow': 25.5,
            'uv': 2.30289,
            'weather': {
              'icon': 's01d',
              'code': 600,
              'description': 'Light snow'
            },
            'wind_dir': 281,
            'max_dhi': null,
            'clouds_hi': 7,
            'precip': 2.25,
            'low_temp': -2.3,
            'max_temp': -0.1,
            'moonset_ts': 1614441257,
            'datetime': '2021-02-27',
            'temp': -1.4,
            'min_temp': -2.7,
            'clouds_mid': 14,
            'clouds_low': 77
          }
        ]
      };

      const data = formatWeather(actual);

      expect(data).toEqual(expectation);
    });

    //Test review function
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
        'businesses': [
          {
            'id': 'Ys42wLKqrflqmtqkgqOXgA',
            'alias': 'luc-lac-portland-7',
            'name': 'Luc Lac',
            'image_url': 'https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg',
            'is_closed': false,
            'url': 'https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=CQE1JjgHx0oM_A9JTQhg7A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CQE1JjgHx0oM_A9JTQhg7A',
            'review_count': 3205,
            'categories': [
              {
                'alias': 'vietnamese',
                'title': 'Vietnamese'
              },
              {
                'alias': 'tapasmallplates',
                'title': 'Tapas/Small Plates'
              },
              {
                'alias': 'cocktailbars',
                'title': 'Cocktail Bars'
              }
            ],
            'rating': 4.0,
            'coordinates': {
              'latitude': 45.516868,
              'longitude': -122.675447
            },
            'transactions': [
              'pickup',
              'delivery'
            ],
            'price': '$$',
            'location': {
              'address1': '835 SW 2nd Ave',
              'address2': null,
              'address3': '',
              'city': 'Portland',
              'zip_code': '97204',
              'country': 'US',
              'state': 'OR',
              'display_address': [
                '835 SW 2nd Ave',
                'Portland, OR 97204'
              ]
            },
            'phone': '+15032220047',
            'display_phone': '(503) 222-0047',
            'distance': 1312.1776320869053
          }
        ]
      };

      const data = formatReviews(actual);

      expect(data).toEqual(expectation);
    });


  });
});