

const PG = require("pg");


function getCategories (request, result) {
  const client = new PG.Client();
  client.connect();
  client.query(
    "SELECT * FROM categories",
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

module.exports = getCategories;
