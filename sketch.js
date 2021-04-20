var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

var feed;
var lastFed;
var fedTime;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedDog = createButton("Feed Dog");
  feedDog.position(800,120);
  feedDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
  
 fill("red");
 textSize(16);
 
 if(lastFed >= 12){
   text("Last Feed: " + lastFed%12 + " PM ",350,30)
 }
 else if(lastFed === 0){
   text("Last Feed: 12 AM",350,30)
 }
else{
  text("Last Feed: " + lastFed + " AM ",350,30)
}
 
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
    foodObj.updateFoodStock(food_stock_val *0)
  }

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
