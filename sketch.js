var mario, marioAnim, marioJump;

var enemy, enemyAnim, enemyGroup;

var roadBack, backAnim;

var coin, coinGroup, coinAnim;

var brickGroup, brick, brickAnim, brickCrackAnim;

var speed = 0;

var score = 0, Highscore = 0;

var xVelocity = -5;

function preload() {
  marioAnim = loadAnimation("mario 1.png",  "mario 2.png", "mario 3.png")
  marioJump = loadImage("mario jump.png");
  //enemyAnim = loadImage("mushroomEnem2.png")
  backAnim = loadImage("road.png");
  coinAnim = loadAnimation("gold1.png", "gold2.png", "gold3.png", "gold4.png", "gold5.png", "gold6.png", "gold7.png", "gold8.png", "gold9.png");
  brickAnim = loadImage("brick1.png");
  brickCrackAnim = loadImage("brickCracked.png");
  enemyAnim = loadAnimation("mushroomEnem.png", "mushroomEnem2.png");
}

function setup() {
  createCanvas(1366, 700);
  mario = createSprite(150, 600, 40, 40)
  mario.addAnimation("m1", marioAnim);
  mario.scale = 2.5;

  //Road Sprite
  roadBack = createSprite(683, 630, 10, 10)
  roadBack.addImage("roadBackground", backAnim);

  coinGroup = createGroup();
  brickGroup = createGroup();
  enemyGroup = createGroup();
}

function draw() {
  background("white");
  speed = Math.round(frameCount / 15);
  xVelocity = -(4 + 4 * speed / 100);  

  
  mario.velocityY += 0.75;

  if (keyDown("space") && mario.y > 555) {
    mario.velocityY = -14;
    mario.addImage("m1", marioJump);
  } else if (keyWentUp("space")) {
    mario.addAnimation("m1", marioAnim);
  }

  //Keeps mario in position
  if (mario.x < 150) {
    mario.velocityX += .5;
  } else {
    mario.velocityX = 0;
  }

  if (keyWentDown(RIGHT_ARROW)) {
    mario.velocityX = 4;
    roadBack.velocityX = -4;
  } if(keyWentDown(LEFT_ARROW)) {
    mario.velocityX = -4;
    roadBack.velocityX = 4;
  } if (keyWentUp(RIGHT_ARROW) || keyWentUp(LEFT_ARROW)) {
    mario.velocityX = 0;
    roadBack.velocityX = 0;
  }
  
  //Displaying Score
  textSize(25);
  text("Score: " + score, 600, 600);


  //Calling Functions
  brickSpawn();
  roadReset();
  coinSpawn();
  coinTouch();
  enemSpawn();

  //console.log(roadBack.x);

  mario.collide(roadBack);
  mario.collide(brickGroup);

  drawSprites();
}

//My Functions
function roadReset() {
  if (roadBack.x < 200 || roadBack.x > 1166) {
    roadBack.x = 683;
  } 
}

function coinSpawn() {
  if (frameCount % 225 === 0) {
    coin = createSprite(1370, 475, 10, 10);
    coin.addAnimation("c1", coinAnim);
    coin.scale = 0.08;
    //coin.collide(brickGroup);
    coinGroup.add(coin);
    coinGroup.setVelocityXEach(xVelocity);
    coinGroup.setLifetimeEach(290);
  }
}

function coinTouch() {
  if (mario.isTouching(coinGroup)) {
    coinGroup.setVelocityXEach(0);
    coinGroup.setVelocityYEach(-10);
    coinGroup.setLifetimeEach(10);
    score += 1;
  }
}

function brickSpawn() {
  if (frameCount % 225 === 0) {
    brick = createSprite(1370, 515, 10, 10);
    brick.scale = 1.25;
    brick.addImage("b1", brickAnim);
    brickGroup.add(brick);
    brickGroup.setVelocityXEach(xVelocity);
    brickGroup.setLifetimeEach(290);
  }
}

function enemSpawn() {
  if (frameCount % 10 === 0) {
    var enemy1 = createSprite(600, 605, 10, 10);
    enemy1.addAnimation("e11", enemyAnim);
    //enemy1.scale = 0.8;
    enemy1.velocityX = -5
    enemyGroup.add(enemy1);
    console.log("hello");
    //enemyGroup.setVelocityXEach(-5);
  }
}