const fetch = require("node-fetch");
const config = require('./config.js');


// async function which fetches all popular restaurants of a city using Google places API
module.exports.getAllPopularResturantsByCityname = async function(restaurants, citynm){
    let _GPLACE_URL_RSRNTS = `https://maps.googleapis.com/maps/api/place/textsearch/json?`
                             + `query=popular+restaurants+in+${citynm}&key=${config._API_KEY}`;
    console.log(_GPLACE_URL_RSRNTS);

    await fetch(_GPLACE_URL_RSRNTS)
    .then(response => response.json())
    .then((data) => {
        let results = data.results;
        if(restaurants.length>0) {
            restaurants = [];
        }
        for(let i=0; i<results.length; i++) {
            let results_obj = results[i];

            let photo_ref = results_obj.photos[0].photo_reference;
            
            
            let custom_obj = {
                "restaurant_name" : results_obj.name,
                "restaurant_rating" : results_obj.rating,
                "restaurant_address" : results_obj.formatted_address,
                "restaurant_photo_ref" : photo_ref
            };
            
            restaurants.push(custom_obj);

        }
        console.log(restaurants);
    })
    .catch(console.log)

    return restaurants;
}


// async function which fetches specific type of popular restaurants of a city
module.exports.getResturantsByType = async function(restaurants, restaurant_type, citynm) {
    let _GPLACE_URL_RSRNTS = `https://maps.googleapis.com/maps/api/place/textsearch/json?`
                             + `query=popular+${restaurant_type}+restaurants+in+${citynm}`
                             + `&key=${config._API_KEY}`;
    console.log(_GPLACE_URL_RSRNTS);

    await fetch(_GPLACE_URL_RSRNTS)
          .then(response => response.json())
          .then((data) => {
              let results = data.results;
              
              if(restaurants.length>0) {
                  restaurants = [];
              }

              for(let i=0; i<results.length; i++) {
                let results_obj = results[i];

                let photo_ref = results_obj.photos[0].photo_reference;
                
                
                let custom_obj = {
                    "restaurant_name" : results_obj.name,
                    "restaurant_rating" : results_obj.rating,
                    "restaurant_address" : results_obj.formatted_address,
                    "restaurant_photo_ref" : photo_ref
                };
                
                restaurants.push(custom_obj);
              }
              console.log(restaurants);
          })
          .catch(console.log);

          return restaurants;
}

module.exports.getAllRestaurantPhotoDtls = async function(restaurants) {
    for(let j=0; j<restaurants.length; j++ ) {
        let _RESTRNT_PHOTO_URL = `https://maps.googleapis.com/maps/api/place/photo?`
                            + `maxwidth=200&photoreference=${restaurants[j].restaurant_photo_ref}`
                            + `&key=${config._API_KEY}`;
        
        await fetch(_RESTRNT_PHOTO_URL)
        .then(response => response.url)
        .then((urlstr) => {
            console.log('URL:: ' + urlstr)
            restaurants[j].restaurant_photo_url = urlstr;
            delete restaurants[j].restaurant_photo_ref;
        })
        .catch(console.log)
    }
    
    return restaurants;
}

