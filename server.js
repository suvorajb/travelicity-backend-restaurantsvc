const express = require("express");
const app = express();
const func = require('./func.js');


app.use(express.json());

//const _API_KEY = "AIzaSyCCH_caViX6E8mL2A6QIoBrmuV6mfd4Kwk";

////// this GET method retrieves top rated restaurants list for a city
///// the only paramter needs to be sent is the City name
app.get("/travelicity/restaurants/:cityname", function(req, res) {
    let citynm = req.params.cityname;
    console.log("City to search for ::" + citynm);
    let restaurants = [];

    // get all popular restaurants of a city
    func.getAllPopularResturantsByCityname(restaurants, citynm)
    .then((restaurants)=> {
        console.log('********* Got the restaurant list... total no of restaurants is - ' + restaurants.length);
        console.log('********* Now update all restaurant with photo url');
        // update with photo
        func.getAllRestaurantPhotoDtls(restaurants)
        .then((restaurants) => {
            console.log('******** All restaurants are updated with photo URL... ')
            res.json(restaurants);
        });
    });   
});

///// this post method allows more customized way to send restaurant query search
///// POST json with restaurant type(Indian, Italian, Mexican etc.), cityname

app.post("/travelicity/restaurants", function(req, res) {

    const jsonqry = req.body;

    let restaurant_type = jsonqry.restaurant_category;
    let citynm = jsonqry.cityname;
    let restaurants = [];

    console.log('jsonquery - ' + JSON.stringify(jsonqry));

    // get all restaurants by type
    func.getResturantsByType(restaurants, restaurant_type, citynm)
    .then((restaurants)=> {
        console.log('********* Got the restaurant list... total no of restaurants is - ' + restaurants.length);
        console.log('********* Now update all restaurant with photo url');
        // update with photo
        func.getAllRestaurantPhotoDtls(restaurants)
        .then((restaurants) => {
            console.log('******** All restaurants are updated with photo URL... ')
            res.json(restaurants);
        });
    }); 
})



const server = app.listen(8081, function() {
    console.log("Server started and listening at port 8081");
})