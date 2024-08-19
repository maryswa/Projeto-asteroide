class Inimigo{
  constructor(x,y){
    this.x =x;
    this.y = y;
  }
  
  render(){
    push();
    fill(0,255,0);
    noStroke();
    rect(this.x,this.y,25);
    pop();
  }
  
  update(){
    this.y +=1;
  }
}