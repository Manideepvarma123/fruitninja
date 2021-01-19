//to call sprites
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit1,fruit2,fruit3,fruit4,monster;
var swordImage,monsterImage,gameoverImage;
var fruitGroup,enemyGroup;
var gameover;
var score=0;


function preload() {
  
  //load images
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  swordImage = loadImage("knife.png");
  gameoverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
}


function setup() {
  //to create screen
  createCanvas(500,500);
  
  sword = createSprite(100,200,20,20);  
  sword.scale=0.72;
  sword.addImage(swordImage);
  fruitGroup = new Group();
  enemyGroup = new Group();
  
}


function draw() {
  //to color background
  background("lightblue");
  
  if(gameState === PLAY){
 
  Enemy();
  fruits();
     
  sword.y=World.mouseY;
  sword.x=World.mouseX;   
     
   if(fruitGroup.isTouching(sword)) {
    fruitGroup.destroyEach();
    knifeSwooshSound.play();
    score=score+2;
   }
     
     else if(enemyGroup.isTouching(sword)) {
      
      gameState = END;
    
  fruitGroup.destroyEach();
  enemyGroup.destroyEach();
  fruitGroup.velocityX=0;
  enemyGroup.velocityX=0;
  sword.addImage(gameoverImage);
  sword.scale=1.5;
  sword.x=250;
  sword.y=250;
  
  //gameover sound
  gameOverSound.play()

    }
    
  }
  
  //to draw sprites
  drawSprites();
  
  //to display score
  text("Score : " + score,400,50);
  
}

//to create fruits function
function fruits() {
  
  if(World.frameCount%80===0){ 
   position = Math.round(random(1,2));
   fruit=createSprite(500,200,20,20);
   fruit.scale=0.2;
     //using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
    {
    fruit.x=500;
    fruit.velocityX=-(10+(score/4));
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
  //Increase the velocity of fruit after score 4 or 10
      fruit.velocityX= (10+(score/4));
      }
    }
    
   
    r=Math.round(random(1,4)); 

     if(r == 1) {
      fruit.addImage(fruit1);
     } 
     else if (r == 2){
      fruit.addImage(fruit2)
     } 
     else if (r == 3){
      fruit.addImage(fruit3)
     } 
     else if (r == 4){
      fruit.addImage(fruit4)
     }

     fruit.y=Math.round(random(50,340))
     fruit.setlifetime=200;

     fruitGroup.add(fruit);
  }
  
}
  
//to create enemies function   
  function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
    
   }
   
  }