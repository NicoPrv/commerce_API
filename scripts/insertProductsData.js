const PG = require("pg");
const client = new PG.Client();
const request = require ("request");






function getProducts(callback) {
  request(
    {
      url: "https://decath-product-api.herokuapp.com/products/",
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



function insertProducts(data){
  const brandsArray = JSON.parse(data);
  console.log(brandsArray);
  brandsArray.forEach(function insert(arrayData){
    client.connect();
    client.query(
      "INSERT INTO products (id, decathlon_id, title, description, brand_id, min_price, max_price, crossed_price, percent_reduction, image_path, rating) VALUES ($1::uuid,$2::int,$3::varchar,$4::text,$5::uuid,$6::numeric,$7::numeric,$8::numeric,$9::numeric,$10::varchar,$11::numeric)",
      [arrayData.id, arrayData.decathlon_id,arrayData.title,arrayData.description,arrayData.brand_id,arrayData.min_price,arrayData.max_price,arrayData.crossed_price,arrayData.percent_reduction,arrayData.image_path,arrayData.rating],
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

  getProducts(insertProducts);
