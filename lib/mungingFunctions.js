function formatLocation(locData) {
    return {
        formatted_query: locData[0].display_name,
        latitude: locData[0].lat,
        longitude: locData[0].lon
    };
}


function formatWeather(weatherData) {
    //Map through the array of weather and return a new array with forecast and time only
    const formattedResponse = weatherData.data.map(weatherItem => {
        return {
            forecast: weatherItem.weather.description,
            //How to calculate time since 1970
            time: new Date(weatherItem.ts * 1000).toLocaleDateString(),

        };
    });
    //The final response should show 7 days of weather
    const finalResponse = formattedResponse.slice(0, 14);
    return finalResponse;
}

function formatReviews(reviewData) {
    //Map through the array of reviews and return a new array
    const formattedResponse = reviewData.businesses.map(reviewItem => {
        return {
            name: reviewItem.name,
            image_url: reviewItem.image_url,
            price: reviewItem.price,
            rating: reviewItem.rating,
            url: reviewItem.url
        };
    });
    return formattedResponse;
}


module.exports = {
    formatLocation,
    formatWeather,
    formatReviews,
};