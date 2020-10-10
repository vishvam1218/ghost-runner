var towerImage,tower;
var doorImage,door,doorsGroup;
var climberImage,climber,climbersGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleBlockGroup;
var gameState;
var gameSound;
function preload(){
towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  gameSound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  gameSound.loop();
tower =createSprite(300,300);
  tower.addImage (towerImage);
  tower.velocityY=1;
  doorsGroup=new Group();
  climbersGroup=new Group();
  ghost=createSprite(200,200,50,50);
  ghost.scale=0.3;
  ghost.addImage(ghostImage);
  invisibleBlockGroup=new Group();
  gameState="play";
  
}
function draw(){
  
background("black");
  if(gameState==="play"){
    
  if (tower.y>400){
    tower.y=300;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.8
  if(keyDown(LEFT_ARROW)){
    ghost.x=ghost.x-3
  }
  if(keyDown(RIGHT_ARROW)){
    ghost.x=ghost.x+3
  }
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  spawnDoors();
  drawSprites();
  }
  if(gameState==="end"){ 
  stroke("yellow");
    fill("red");
    textSize(38);
    text("game over",230,250);
  }
  
}
function spawnDoors(){
  if(frameCount%240===0){
    door =createSprite(200,-50);
    door.addImage(doorImage);
    climber=createSprite(200,10);
    climber.addImage(climberImage);
    invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    door.x=Math.round(random(120,400))
    door.velocityY=1;
    climber.velocityY=1;
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    climber.x=door.x;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    invisibleBlock.debug=true;
    door.lifetime=800;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
  
  