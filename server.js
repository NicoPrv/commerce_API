const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const PG = require("pg");
const getBrandById = require ("./handlers/getBrandById.js");
const getBrands = require ("./handlers/getBrands.js");
const getCategoryById = require ("./handlers/getCategoryById.js");
const getCategories = require ("./handlers/getCategories.js");
const getProductById = require ("./handlers/getProductById.js");
const getProducts = require ("./handlers/getProducts.js");
const getProductsByCategoryId = require ("./handlers/getProductsByCategoryId.js");



//ROUTE TO GET A BRAND BY ITS ID
app.get("/brands/:id", getBrandById);

//ROUTE TO GET ALL BRANDS
app.get("/brands", getBrands);

//ROUTE TO GET A CATEGORY BY ITS ID
app.get("/categories/:id", getCategoryById);

//ROUTE TO GET ALL CATEGORIES
app.get("/categories", getCategories);

//ROUTE TO GET A PRODUCT BY ITS ID
app.get("/products/:id", getProductById);

//ROUTE TO GET ALL PRODUCTS
app.get("/products", getProducts);

//ROUTE TO LAST QUERY TO BE DONE
app.get("/categories/:id/products", getProductsByCategoryId);


  // app.get("/categories/:id/products", function (request, result) {
  //   const client = new PG.Client();
  //     client.connect();
  //     client.query(
  //       "SELECT * FROM products WHERE id=$1::uuid",
  //       function(error, result2) {
  //         client.end();
  //         if (error) {
  //           console.warn(error);
  //           result.send("ERROR");
  //         } else {
  //           result.json(result2.rows[0]);
  //         }
  //       });
  // });
//
//
// /categories/:id/products




  app.listen(port, function () {
    console.log("Server listening on port:" + port);
  });
