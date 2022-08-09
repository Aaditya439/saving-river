var submarine , canImg , score , back , instruction2;
var gameState = "serve";

function preload(){
  backgroundImg = loadImage("Under water.jpg");
  submarineImg = loadImage("submarine.png")
  canImg = loadImage("can.png");
  metalImg = loadImage("Metal Scrap.png");
  plasticBagImg = loadImage("PLastic bag.png");
  plasticBottleImg = loadImage("Water bottle.png");

  fishImg1 = loadImage("Fish.png");
  fishImg2 = loadImage("Fish2.png");

  playImg = loadImage("play button.png");
  logoImg = loadImage("logo.png");
  instructionImg = loadImage("instruction.png");

  background2Img = loadImage("background1.jpg");

  instruction2Img = loadImage("Instruction2.png");

  backImg = loadImage("backbutton.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight - 1);
  submarine = createSprite(200, 200, 50, 50);
  submarine.addImage(submarineImg);
  submarine.scale = 0.5
  score = 0;
  submarine.visible = false;

  play = createSprite(windowWidth/2 , windowHeight/2 + 50 , 100 , 50);
  play.addImage(playImg);
  play.scale = 0.4;
  
  logo = createSprite(windowWidth/2 , windowHeight/4 , 100,100);
  logo.addImage(logoImg);

  instruction = createSprite(windowWidth/2 , windowHeight/2 + 200 , 100 , 100);
  instruction.addImage(instructionImg);
  instruction.scale = 0.5;


  garbage1Group = new Group;
  garbage2Group = new Group;
  garbage3Group = new Group;
  garbage4Group = new Group;
  fishG = new Group;

  back = createSprite( 100 , windowHeight - 100 , 100 ,50);
  back.addImage(backImg);
  back.scale = 0.25;
  back.visible = false;

  instruction2 = createSprite(windowWidth/2 , 70 , windowWidth/ 2, 100)
  instruction2.addImage(instruction2Img);
  instruction2.visible = false;

}

function draw() {
  
  if(gameState == "serve"){

    background(background2Img);
    logo.visible = true;
    play.visible = true;
    instruction.visible = true;
    back.visible = false;
    instruction2.visible = false;

    fishG.destroyEach();
    garbage1Group.destroyEach();
    garbage2Group.destroyEach();
    garbage3Group.destroyEach();
    garbage4Group.destroyEach();

    submarine.visible = false;
    

    
    if(mousePressedOver(play) && gameState == "serve"){
      gameState = "play"
    }

    if(mousePressedOver(instruction) && gameState == "serve"){
      gameState = "info"
    }
  }

  if(gameState == "info"){
    background(background2Img);
    logo.visible = false;
    play.visible = false;
    instruction.visible = false;

    back.visible = true;
    instruction2.visible = true;

    fishG.destroyEach();
    garbage1Group.destroyEach();
    garbage2Group.destroyEach();
    garbage3Group.destroyEach();
    garbage4Group.destroyEach();

    submarine.visible = false;

    textSize(75);
    fill("black")
    text("1) Use the submarine to catch waste." ,100 , 250);
    text("2) Stay away from the fishes." ,  100 , 500);

    if(mousePressedOver(back) && gameState == "info"){
      gameState = "serve";
    }
  }
   
if(gameState == "play"){

 logo.visible = false;
 play.visible = false;
 instruction.visible = false;

  submarine.visible = true;
  submarine.y = World.mouseY;
  background(backgroundImg); 

  fill("Black");
  textSize(40);
  text("Score: " + score , windowWidth - 200, 50 )

  var rand3 = Math.round(random(1,4));
  
  switch(rand3){
    case 1: garbage1()
    break;
    case 2 : garbage2()
    break;
    case 3 : garbage3()
    break;
    case 4 : garbage4()
    break;   
  }

  if(submarine.isTouching(garbage1Group)){
    garbage1Group.destroyEach();
    score++;
  }
  else if(submarine.isTouching(garbage2Group)){
    garbage2Group.destroyEach();
    score++;
  } 
  else if(submarine.isTouching(garbage3Group)){
    garbage3Group.destroyEach();
    score++;
  }
  else if(submarine.isTouching(garbage4Group)){
    garbage4Group.destroyEach();
    score++;
  }

  var trial = createSprite(0 , windowHeight/2 ,20,windowHeight);
  trial.visible = false;

console.log(garbage1.x)
  if(submarine.isTouching(fishG)){
    gameState = "serve";
    fishG.destroyEach();
    
  }

  if(garbage1Group.collide(trial) || garbage2Group.collide(trial) || garbage3Group.collide(trial) || garbage4Group.collide(trial))
  {
    gameState = "serve";
    fishG.destroyEach();
  }
  fish();

}

  

  drawSprites();
}



function garbage1(){

  if(frameCount % 100 === 0){
    var garbage1 = createSprite(windowWidth - 100 , Math.round(random(50, windowHeight  -50)) , 50 ,50);
    garbage1.velocityX = -7;
    garbage1.addImage(canImg);
    garbage1.scale = 0.07;
    garbage1Group.add(garbage1)
    
  }
}

function garbage2(){

  if(frameCount % 75 === 0){
    var garbage2 = createSprite(windowWidth - 100 , Math.round(random(50, windowHeight  -50)) , 50 ,50);
    garbage2.velocityX = -8;
    garbage2.addImage(plasticBagImg);
    garbage2.scale = 0.15;
    garbage2Group.add(garbage2)   
    
  }
}

function garbage3(){

  if(frameCount % 75 === 0){
    var garbage3 = createSprite(windowWidth - 100 , Math.round(random(50, windowHeight  -50)) , 50 ,50);
    garbage3.velocityX = -8;
    garbage3.addImage(metalImg);
    garbage3.scale = 0.35;
    garbage3Group.add(garbage3)
    
  }
}

function garbage4(){

  if(frameCount % 75 === 0){
    var garbage4 = createSprite(windowWidth - 100 , Math.round(random(50, windowHeight  -50)) , 50 ,50);
    garbage4.velocityX = -8;
    garbage4.addImage(plasticBottleImg);
    garbage4.scale = 0.25;
    garbage4Group.add(garbage4)

  }
}

function fish(){
  
  if(frameCount % 150 == 0){
    var fish = createSprite(windowWidth - 100 , Math.round(random(50, windowHeight  -50)) , 50 ,50)
    fish.velocityX = -9;

    var rand2 = Math.round(random(1,2));

    switch(rand2){
      case 1 : fish.addImage(fishImg1);
      fish.scale = 0.15
      break;
      case 2 : fish.addImage(fishImg2);
      fish.scale  = 0.25;
      break;
    }

    fish.lifetime = 300;
    fishG.add(fish);
  }
}
