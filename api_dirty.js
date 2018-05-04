const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const PG = require("pg");




app.get("/brands/:id", function (request, result) {
  const client = new PG.Client();
    console.log(request);
    console.log("pouet");
    client.connect();
    client.query(
      "SELECT * FROM brands WHERE id = $1::uuid",
      [request.params.id],
      function(error, result2) {
        client.end();
        if (error) {
          console.warn(error);
          result.send("ERROR");
        } else {
          result.json(result2.rows[0]);
        }
      });
  });


  app.get("/brands", function (request, result) {
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
        });
  });


  app.get("/categories/:id", function (request, result) {
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
            result.json(result2.rows);
          }
        });
  });


  app.get("/categories", function (request, result) {
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
            result.json(result2.rows[0]);
          }
        });
  });


  app.get("/products", function (request, result) {
    const client = new PG.Client();
      client.connect();
      client.query(
        "SELECT * FROM products",
        function(error, result2) {
          client.end();
          if (error) {
            console.warn(error);
            result.send("ERROR");
          } else {
            result.json(result2.rows);
          }
        });
  });

  app.get("/products/:id", function (request, result) {
    const client = new PG.Client();
      client.connect();
      client.query(
        "SELECT * FROM products WHERE id=$1::uuid",
        function(error, result2) {
          client.end();
          if (error) {
            console.warn(error);
            result.send("ERROR");
          } else {
            result.json(result2.rows[0]);
          }
        });
  });


  app.get("/categories/:id/products", function (request, result) {
    const client = new PG.Client();
      client.connect();
      client.query(
        "SELECT * FROM products WHERE id=$1::uuid",
        function(error, result2) {
          client.end();
          if (error) {
            console.warn(error);
            result.send("ERROR");
          } else {
            result.json(result2.rows[0]);
          }
        });
  });
//
//
// /categories/:id/products




  app.listen(port, function () {
    console.log("Server listening on port:" + port);
  });
