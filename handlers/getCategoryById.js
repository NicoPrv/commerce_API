

const PG = require("pg");


function getCategoryById(request, result) {
  const client = new PG.Client();
  client.connect();
  client.query(
    "SELECT * FROM categories WHERE id = $1::uuid",
    [request.params.id],
    function(error, result2) {
      client.end();
      if (error) {
        console.warn(error);
        result.send("ERROR");
      } else {
        result.json(result2.rows[0]);
      }
    }
  );
}

module.exports = getCategoryById;
