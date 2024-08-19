//Projeto de Desenvolvimento de Sistemas
//Aula de POO  e Encapsulamento
//Demetrio Torgan

//Objetivos:
//1- Criar a classe Nave
//2- Criar a função Render
//3- Criar a função Turn com as setas do teclado
//4- Criar a função de bordas
//5 - Criar Placar
//6 - Adicionando o segundo jogador

//------------------Variaveis Globlais-----------
let nave;
let nave2;
let inimigo;
let tiros = [];
let tiros2 = [];
let inimigos = [];
let meusPontos = 0;
let pontosOponente = 0;
let fundo;


function preload(){
  fundo = loadImage('img/galaxia.jpg');
}

function setup() {
  createCanvas(400, 400);
  nave = new Nave(0,0,333);
  nave2 = new Nave(0,0,255);
  
  for(let i = 0; i < 10; i++){
    let inimigoJogo = new Inimigo(random(0,width),random(-800,0));
    inimigos.push(inimigoJogo);
  }
} 

function draw() {
    background(fundo);
    
  
    for(let inimigo of inimigos){
      inimigo.render();
      inimigo.update();  
    }
    verificaColisao();
    verificaColisaoNave2();
  
  //Exbindo os tiros
  for(let i = tiros.length -1; i >=0; i--){    
    tiros[i].render();
    tiros[i].update();       
  }
  
  for(let i = tiros2.length -1; i >=0; i--){    
    tiros2[i].render();
    tiros2[i].update();       
  }
  

  
  nave.render();
  nave.update();
  nave.turn();
  nave.bordas();  
  
  nave2.render();
  nave2.update();
  nave2.turn();
  nave2.bordas();
  
  placar();
}

//-----------Funções do Teclado
function controleNave(){
  if(keyCode == UP_ARROW){
    nave.acelerando(true);
  }
  if(keyCode == RIGHT_ARROW){
    nave.setRotation(0.1);
  }
  if(keyCode == LEFT_ARROW){
    nave.setRotation(-0.1);
  }
  if(key == ' '){    
    tiros.push(new Laser(nave.pos,nave.heading));    
  }
}

function controleNave2(){
  if(keyCode == 87){
    nave2.acelerando(true);
  }
  if(keyCode == 68){
    nave2.setRotation(0.1);
  }
  if(keyCode == 65){
    nave2.setRotation(-0.1);
  }
  if(keyCode == 83){    
    tiros2.push(new Laser(nave2.pos,nave2.heading));    
  }
}


function keyPressed(){
  controleNave();
  controleNave2();
}

function keyReleased(){
  if(keyCode == UP_ARROW){
    nave.acelerando(false);
  }
  if(keyCode == 87){
    nave2.acelerando(false);
  }
  
  nave.setRotation(0);
  nave2.setRotation(0);
}

//-----------------Colisao----------

function verificaColisao(){
  for(let inimigoJogo of inimigos){
    for(let tiro of tiros){
      if(dist(inimigoJogo.x,inimigoJogo.y,tiro.pos.x,tiro.pos.y)<25){
        inimigos.splice(inimigos.indexOf(inimigoJogo),1);
          let novoInimigo = new Inimigo(random(0,width),random(-800,0));
            inimigos.push(novoInimigo);
              meusPontos +=1;
      }
    }
  }
}

function verificaColisaoNave2(){
  for(let inimigoJogo of inimigos){
    for(let tiro of tiros2){
      if(dist(inimigoJogo.x,inimigoJogo.y,tiro.pos.x,tiro.pos.y)<25){
        inimigos.splice(inimigos.indexOf(inimigoJogo),1);
          let novoInimigo = new Inimigo(random(0,width),random(-800,0));
            inimigos.push(novoInimigo);
              pontosOponente +=1;
      }
    }
  }
}

//---------------------Placar----------------
function placar(){
  push()
  textSize(40);
  fill(255,255,0);
  textFont('Jersey 10');
  text("P1: "+ meusPontos,30,100);
  fill(255,0,0);
  text("P2: "+ pontosOponente,300,100);
  pop();
}

