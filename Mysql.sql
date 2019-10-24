DROP DATABASE IF EXISTS amazon_db;

CREATE DATABASE amazon_db;

USE amazon_db;

CREATE TABLE products (
  item_id int(11) auto_increment,
  productname Varchar(30) not null,
  price decimal(11,2) not null,
  category varchar(30) not null,
  instock int(10) not null,
  primary key(item_id)
);
INSERT INTO products (productname, price, category, instock)
values 
("legos", 20, "toys", 13), 
("baseball", 4, "sport", 40), 
("hat", 6, "clothing", 12), 
("Greyshirt", 10, "clothing", 5), 
("GIjoe", 20, "toys", 9), 
("bat", 25, "sport", 4), 
("nikes", 5, "sport", 6), 
("underpants", 4, "clothing", 8), 
("xbox", 250, "toys", 3), 
("ps4", 250, "toys", 2)