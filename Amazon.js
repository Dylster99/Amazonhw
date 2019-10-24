const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "amazon_db"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllproducts();
  });
  function queryAllproducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (let i = 0; i < res.length; i++) {
        console.log("item id: "+ res[i].item_id + " | " + "Name: " + res[i].productname + " | " + "Price: " + res[i].price+ " | " + "num in stock: " + res[i].instock);
      }
    
      question1();
    });
}
function question1() {
    inquirer
      .prompt([{
        name: "idNUM",
        type: "input",
        message: "Enter the id of the item you'd like to purchase?",
        filter: Number
      },
      {
          name: "howMany",
          type: "input",
          message: "How many do you want to purchase?",
          filter: Number
      }]).then(function(answer) {
       
        let id = answer.idNUM;
        let quantity = answer.howMany;
        purchase(id, quantity);
      });
  }
  function purchase (id, quantity) {
      connection.query('Select * FROM products WHERE item_id = ' + id, function(err, res){
        if(err){console.log(err)};
        if(quantity <+ res[0].instock){
            let cost = quantity * res[0].price;
            console.log("we have " + res[0].instock + " of your item in stock");
            console.log("your total cost is $" + cost);

            connection.query("UPDATE products SET instock = instock - " + quantity + "WHERE item_id = " + id);
        }else{
			console.log("We are currently do not have enough " + res[0].productname + " to complete your order. We only have " + res[0].instock + " total units.");
        };
    })
    queryAllproducts();
  }