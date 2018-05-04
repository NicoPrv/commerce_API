

const PG = require("pg");


function getProductsByCategoryId(request, result) {
  const client = new PG.Client();
  client.connect();
  client.query(
    "SELECT * FROM cat_products WHERE category=$1::uuid",
    [request.params.id],
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

module.exports = getProductsByCategoryId;
