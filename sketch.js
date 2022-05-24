var bg_1, bg_2;
var player, shooter_1, shooter_2;
var zombie, zombieImg, zombieGroup;
var heart1, heart2, heart3;
var heart_1, heart_2,heart_3;
var bullets = 70, bulletGroup;
var gameState = "fight";
var lose, win, explosionSound;
var lives = 3;
var score = 0;

function preload(){
bg_1 = loadImage("assets/bg.jpeg");
shooter_1 = loadImage("assets/shooter_2.png");
shooter_2 = loadImage("assets/shooter_3.png");
heart_1 = loadImage("assets/heart_1.png");
heart_2 = loadImage("assets/heart_2.png");
heart_3 = loadImage("assets/heart_3.png");
zombieImg = loadImage("assets/zombie.png");
lose = loadSound("assets/lose.mp3");
win = loadSound("assets/win.mp3");
explosionSound = loadSound("assets/explosion.mp3");
}

function setup(){
createCanvas(windowWidth,windowHeight);

bg_2 = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
bg_2.addImage(bg_1);
bg_2.scale = 1.1;

player = createSprite(displayWidth-1150,displayHeight-300,50,50);
player.addImage(shooter_1);
player.scale = 0.35;

player.setCollider("rectangle",0,0,300,500);
player.debug = true;

heart1 = createSprite(displayWidth-150,40,20,20);
heart1.visible = true;
heart1.addImage(heart_1);
heart1.scale = 0.4;

heart2 = createSprite(displayWidth-110,40,20,20);
heart2.visible = true;
heart2.addImage(heart_2);
heart2.scale = 0.4;

heart3 = createSprite(displayWidth-150,40,20,20);
heart3.visible = true;
heart3.addImage(heart_3);
heart3.scale = 0.4;

zombieGroup = new Group();
bulletGroup = new Group();

}

function draw(){
  background("white");
  if(gameState === "fight"){
  
  if(lives === 3){
  heart1.visible = false;
  heart2.visible = false;
  heart3.visible = true;
  }

  if(lives === 2){
    heart1.visible = false;
    heart2.visible = true;
    heart3.visible = false;
    }

  if(lives === 1){
      heart1.visible = true;
      heart2.visible = false;
      heart3.visible = false;
      }

  if(lives === 0){
    gameState = "lost"
    lose.play();
  }
  
  if(score == 100){
    gameState = "won"
    win.play();
  }

  if(keyDown("UP_ARROW")|| touches.length>0){
  player.y = player.y-30;
  }

  if(keyDown("DOWN_ARROW")|| touches.length>0){
    player.y = player.y+30;
    }

  /*if(keyDown("RIGHT_ARROW")|| touches.width>0){
    player.x = player.x+30;
    }  
    
  if(keyDown("LEFT_ARROW")|| touches.width>0){
    player.x = player.x-30;
    }*/

  if(keyWentDown("space")){
    bullet = createSprite(displayWidth-1150,player.y-30,20,10);
    bullet.velocityX = 20;
    bulletGroup.add(bullet);
    player.depth = bullet.depth;
    player.depth = player.depth+2;
    player.addImage(shooter_2);
    bullets = bullets-1;
    explosionSound.play();
  }

  else if(keyWentUp("space")){
    player.addImage(shooter_1);
  }
  
  if(bullets == 0){
  gameState = "bullet";
  lose.play();
  }

  if(zombieGroup.isTouching(bulletGroup)){
    for(var i = 0;i<zombieGroup.length; i++){
      if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
      explosionSound.play();
      score = score+5;
      }
  }

  }

  if(zombieGroup.isTouching(player)){
    lose.play();
  for(var i = 0;i<zombieGroup.length; i++){
    if(zombieGroup[i].isTouching(player)){
    zombieGroup[i].destroy();
    lives = lives-1;
    }
  }
  
  }

  spawnZombies();
}
  drawSprites();
  
  textSize(25);
  fill("white");
  text("BULLETS = "+bullets, displayWidth-210, displayHeight/2-250);
  text("SCORE = "+score, displayWidth-200, displayHeight/2-220);
  text("LIVES = "+lives, displayWidth-200, displayHeight/2-280);

  if(gameState == "lost"){
    textSize(100);
    fill("purple");
    text("YOU LOST!",400,400);
    zombieGroup.destroyEach();
    player.destroy();
  }

  else if(gameState == "won"){
    textSize(100);
    fill("blue");
    text("YOU WON!",400,400);
    zombieGroup.destroyEach();
    player.destroy();
  }
  
  else if(gameState == "bullet"){
    textSize(70);
    fill("red");
    text("YOU RAN OUT OF BULLETS!",300,500);
    zombieGroup.destroyEach();
    player.destroy();
    bulletGroup.destroyEach();
  }

}

function spawnZombies(){
  if(frameCount%50===0){
    zombie = createSprite(random(500,1100),random(100,500),40,40);
    zombie.addImage(zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    zombie.setCollider("rectangle",0,0,450,400);
    zombie.debug = true;
    zombie.lifetime = 400;
    zombieGroup.add(zombie);
  }
}
