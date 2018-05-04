const PG = require("pg");
const client = new PG.Client();
const request = require ("request");






function getBrands(callback) {
  request(
    {
      url: "https://decath-product-api.herokuapp.com/brands/",
      method: "GET",
    },
    function(error, response, result) {
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("result:", result); // Print the HTML for the myapi.com homepage.
      console.log(result);
      callback (result);
    }
  );
}

//getBrands(console.log);



function insertBrand(data){
  const brandsArray = JSON.parse(data);
  console.log(brandsArray);
  brandsArray.forEach(function insert(arrayData){
    client.connect();
    client.query(
      "INSERT INTO brands (id, title) VALUES ($1::uuid,$2::text)",
      [arrayData.id, arrayData.title],
      function(error, result) {
        if (error) {
          console.warn(error);
        } else {
          console.log ("Data inserted into database");//console.log(result.rows);// do something with result
        }

    });
  });

}
  client.end();

  getBrands(insertBrand);
