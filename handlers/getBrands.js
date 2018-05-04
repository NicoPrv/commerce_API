

const PG = require("pg");


function getBrands(request, result) {
  const client = new PG.Client();
  client.connect();
  client.query(
    "SELECT * FROM brands",
    function(error, result2) {
      client.end();
      if (error) {
        console.warn(error);
        result.send("ERROR");
      } else {
        result.json(result2.rows);
      }
    }
  );
}

module.exports = getBrands;
