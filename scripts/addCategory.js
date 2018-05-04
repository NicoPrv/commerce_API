const PG = require("pg");
const request = require ("request");
let catProducts=[];
let counter=0;


function getCategories(callback) {
  request(
    {
      url: "https://decath-product-api.herokuapp.com/categories",
      method: "GET",
    },
    function(error, response, result) {
      callback (result);
    }
  );
}



function getAssociatedProducts(data){
  const categoriesArray = JSON.parse(data);
  // console.log(brandsArray);
  categoriesArray.forEach(function getProductsById(arrayData,index){
    let catId=arrayData.id;
    request(
      {
        url: `https://decath-product-api.herokuapp.com/categories/${catId}/products`,
        method:"GET",
      },
      function(error, response, resultProducts) {
        let resultProductsJson = JSON.parse(resultProducts);
        resultProductsJson.forEach(function pouet(data,index2){
          let catProductObj = {};
          catProductObj.category = catId ;
          catProductObj.product = resultProductsJson[index2].id ;
          catProducts.push(catProductObj);
          //counter++;

          //pouetpouet(catProducts);
          //display(catProducts);
        });
      }
    );
  });
}



function display(content){
  console.log(content);
}

getCategories(getAssociatedProducts);


  //let counter=0;
  ////PARTIE INSERTION A BOSSER
setTimeout(function() { pouetpouet(catProducts); }, 10000);

  function pouetpouet(obj){
    //console.log(obj);
    const client = new PG.Client();
    client.connect();

    obj.forEach(function insertDataInDb(element,index){
      let cat = obj[index].category;
      let prod = obj[index].product;
      client.query(
        "INSERT INTO cat_products (category,product) VALUES ($1::uuid,$2::uuid)",
        [cat,prod],
        function(error, result) {
          if (error) {
            console.warn(error);
          } else {
            counter++;
            console.log ("Data inserted into database");//console.log(result.rows);// do something with result
            if(counter >= obj.length){
              console.log("import terminé");
            }
          }
        });
      }
    );
  }

  //client.end();
