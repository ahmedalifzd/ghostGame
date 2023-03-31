var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

spookySound.loop()



  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,200,50,50)
  ghost.addImage(ghostImg)
  ghost.scale = .4

  
invisibleBlockGroup = new Group()
climbersGroup = new Group()
doorsGroup = new Group()
}

function draw() {
  background(200);

  if(gameState==="play"){
   
    if(keyDown("A")){
      ghost.x-= 5
    }
    if(keyDown("D")){
      ghost.x+= 5
    }
    if(keyDown("space")){
      ghost.velocityY=-5
    }
    ghost.velocityY+=.8

    if(tower.y > 400){
      tower.y = 300
    }

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
  
  }
  

  createEnemies()
  
if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
  ghost.destroy()  
  gameState="end"

}

drawSprites()

}
 if(gameState==="end"){
 stroke ("yellow")
 fill ("yellow")
 textSize(32)
 text("GAME OVER!",230,250)


 }
    
}
function createEnemies(){
if (frameCount%240===0){
  var door = createSprite(Math.round(random(120,400)),-50)
  var climber = createSprite(door.x,10)
  var invisibleBlock = createSprite(200,15)
  door.addImage(doorImg)
  climber.addImage(climberImg)
  door.velocityY=1
  climber.velocityY=1
  door.lifetime = 800
  climber.lifetime = 800
  doorsGroup.add(door)
  climbersGroup.add(climber)
  ghost.depth = door.depth
  ghost.depth+=1
  invisibleBlock.widt = climber.width
  invisibleBlock.height=2
  invisibleBlock.x = climber.x
  invisibleBlock.velocityY=1
  invisibleBlock.lifetime=800
  invisibleBlock.debug=true
  invisibleBlockGroup.add(invisibleBlock)
}
}
