//Adding Global Variale In this File
//Adding Game State
 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;

//Adding Canvas And Background back=background              
 var canvas,back1,back1Img,back2,back2Img;

//Adding Players Info, jack=Player
 var jack,jack_moving,jack_jumping;

//Adding invisibleGround 
 var invisibleGround;

//Adding obstacleGroup And its ImagesVariable
 var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6,obstacle7,obstacle8,obstacle9;

//Adding coin Variable and its Image Variable
 var coinsGroup,coinImg;

//Adding Score and Coins variable and setting it to "zero"
 var score = 0;
 var coins = 0;

//Loading Images And Animations In preload Function
function preload(){
  //loading animations for player
   jack_moving=loadAnimation("Images/Image1.png","Images/Image2.png","Images/Image3.png","Images/Image4.png",
      "Images/Image5.png","Images/Image6.png","Images/Image7.png");  
    
    jack_jumping=loadAnimation("Images/Image1.png");

  //loading image for background 
    back1Img=loadImage("Images/Bg.jpg");
    back2Img=loadImage("Images/Bg1.jpg");
  
  //loading ObstaclesImages
    obstacle1 = loadImage("Images/Stone1.png");
    obstacle2 = loadImage("Images/Stone2.png");
    obstacle3 = loadImage("Images/Stone3.png");
    obstacle4 = loadImage("Images/Stone4.png");
    obstacle5 = loadImage("Images/Stone5.png");
    obstacle6 = loadImage("Images/Stone6.png");
    obstacle7=loadImage("Images/Stone7.png");
    obstacle8=loadImage("Images/Stone8.png");
    obstacle9=loadImage("Images/Stone9.png");

  //loading CoinsImage
    coinImg=loadImage("Images/Coins.png"); 
}

//Drawing Character,Background,etc.. In Setup Function
function setup(){

  //creating canvas
    canvas=createCanvas(1800,850);
    
  //creating background, addingImage 
    back1=createSprite(1200,399.9,50,50);
    back1.addImage("back1",back1Img);
    back1.visible=true;

  //making back infinity and giving speed to background
    back1.x = back1.width /2;
    back1.velocity.x=-9

  //scaling background1
   back1.scale=1.499

  //creating background, addingImage 
    back2=createSprite(1200,399,50,50);
    back2.addImage("back2",back2Img);
    back2.visible=false;

  //making back infinity and giving speed to background
    back2.x = back2.width /2;
    back2.velocity.x=-9
   
  //creating player and addingAnimation   
    jack = createSprite(150,730,20,20);
    jack.addAnimation("moving",jack_moving);
    jack.addAnimation("jumping",jack_jumping);

  //adjusting jack to screen
   jack.scale=0.6

  //Creating invisibleGround To Avoid Fall In Void
   invisibleGround = createSprite(937,845,1880,15);
   invisibleGround.visible=false;

  //creating obstacles Group and coins Group
   obstaclesGroup = createGroup();
   coinsGroup = createGroup();
}

//Displaying Sprites and many more in draw functions
function draw(){

  //clear the screen
   background(216,191,216);
  
 //this function will only work in Play State
 if(gameState===PLAY){
   //making background1 infinty 
    if (back1.x < 0){
      back1.x = back1.width/2;
    }

  //changing background if score reaches it limit
    if(score===8900){
      back1.visible=false;
      back2.visible=true;
    }
  //making background1 infinty  
    if (back2.x < 0){
      back2.x = back2.width/2;
    }

  //Adding score function
    score = score + Math.round(getFrameRate()/60);

  //Making Player To Jump and changing animation
     if(keyDown("space")&& jack.y >= 727.7) {
      jack.velocityY = -25;
      jack.changeAnimation("jumping",jack_jumping);
   }
  
  //Adding Gravity
    jack.velocityY = jack.velocityY + 0.8;

  //changing Animation
    jack.changeAnimation("moving",jack_moving);

  //Spawing obstacles and coins in canvas
   spawnObstacles();
   spawnCoins();

  //adding coins when player touches 
   if(coinsGroup.isTouching(jack)){
     coinsGroup.destroyEach();  
     coins = coins + 1;
   }

  //stopping the game when it touches obstacles
   if(obstaclesGroup.isTouching(jack)){
     gameState = END;
   }
 }
  //Adding ending game state function
   else if(gameState === END){

    //changing its animation to give more relastic
     jack.changeImage("jumping",jack_jumping);

    //stopping player and background to stop
     back1.velocityX=0;
     back2.velocityX=0;
     jack.velocityY=0;

    //set lifetime of the game objects so that they are never destroyed
     obstaclesGroup.setLifetimeEach(-1);
     coinsGroup.setLifetimeEach(-1);

    //making obstacles to stop 
     obstaclesGroup.setVelocityXEach(0);
     coinsGroup.setVelocityXEach(0);
  }

  //stopping jack to avoid fall
   jack.collide(invisibleGround);

  //drawing sprites
   drawSprites();

  //displaying score
   stroke("white");
   fill("white");
   textSize(25);
   text("SCORE : "+score,10,20);

  //displaying coins
  stroke("white");
  fill("white");
  textSize(25);
  text("COINS : "+coins,10,50);
}

function spawnObstacles(){
//spawing obstacles every 300frame
 if(frameCount % 300===0){
  //creating obstacles sprite and adding its velocity  
   var obstacle = createSprite(1800,758,50,50);
   obstacle.velocityX=-9;

   obstacle.setCollider("rectangle",25,25);
    obstacle.debug = true

  //generate random obstacles
   var rand = Math.round(random(1,9));
  
  //using swith case to spawn obstacles line by line
  switch(rand) {
    case 1: obstacle.addImage(obstacle1);
            break;
    case 2: obstacle.addImage(obstacle2);
            break;
    case 3: obstacle.addImage(obstacle3);
            break;
    case 4: obstacle.addImage(obstacle4);
            break;
    case 5: obstacle.addImage(obstacle5);
            break;
    case 6: obstacle.addImage(obstacle6);
            break;
    case 7: obstacle.addImage(obstacle7);
            break;
    case 8: obstacle.addImage(obstacle8);
            break;
    case 9: obstacle.addImage(obstacle9);
            break;        
      default: break;
  }

    //assign scale and lifetime to the obstacle           
    obstacle.scale=0.3;
    obstacle.lifetime = 500;

  //adding each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnCoins(){
//spawing coins every 200 frames
 if(frameCount % 250===0){
  //creating coins sprite, adding its velocity and images
    coin=createSprite(1800,758,50,50);
    coin.velocityX=-9 ;
    coin.addImage("coins",coinImg);

    //assign scale and lifetime to the coin         
    coin.scale=0.2
    coin.lifetime = 500;

  //adjust the depth
   coin.depth = jack.depth;
   jack.depth = jack.depth + 1;
   
  //adding each coins to the group
   coinsGroup.add(coin);
  }
}