var path=[];
var eBlock={
  click:{
    active:false,
    x:NaN,
    y:NaN,
    proc:function(x,y){
      if(arguments.length!==2){//only draw
        x=this.x;
        y=this.y;
      }else{
        switch(this.logic(x,y)){
          case undefined:
            break;
          case 'blank':
            return;
          case 'self':
            this.clear();
            return;
          case 'same':
            if(path=map[this.y][this.x].search(y,x)){ //return path
              map[this.y][this.x]=0;
              map[y][x]=0;
              this.clear();
              Render();
              return;
            }else{
              path=[];
            }
        }
        this.x=x;
        this.y=y;
      }
      //ctx.fillStyle='rgba(129,190,247,0.5)';
      //ctx.fillRect(x*30,y*50,30,50);
      ctx.strokeStyle='#F70D2C';
      ctx.strokeRect(x*30,y*50,30,50);
      this.active=true;
    },
    logic:function(x,y){
      if(!map[y][x]){
        return 'blank';
      }
      if(isNaN(this.x) || isNaN(this.y)){
        return undefined;
      }
      if(this.x===x && this.y===y){
        return 'self';
      }
      if(map[y][x].word===map[this.y][this.x].word){
        return 'same';
      }
    },
    clear:function(){
      this.active=false;
      this.x=NaN;
      this.y=NaN;
    }
  },
  mousemove:{
    active:false,
    x:0,
    y:0,
    proc:function(x,y){
      this.x=x;
      this.y=y;
      ctx.fillStyle='rgba(129,190,247,0.5)';
      ctx.fillRect(x*30,y*50,30,50);
      this.active=true;
    }
  }
};
eBlock.keys=Object.keys(eBlock);
(function(){
  var keys=eBlock.keys;
  for(var i=0; i<keys.length; i++){
    canvas.addEventListener(keys[i],canvasEvent);
  }
})();
function canvasEvent(e){
  var x=Math.floor(e.offsetX/30),
      y=Math.floor(e.offsetY/50);
  var t=eBlock[e.type];
  Render();
  for(var i=0; i<eBlock.keys.length; i++){
    var target=eBlock[eBlock.keys[i]];
    if(t===target){
      continue;
    }
    if(target.active===true){
      target.proc();
    }
  }
  t.proc(x,y);
}
function Render(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(var y=0; y<h; y++){
    for(var x=0; x<w; x++){
      if(map[y][x]===0){
        continue;
      }
      map[y][x].draw();
    }
  }
  ctx.fillStyle='rgba(255,200,187,0.5)';
  for(var i=0; i<path.length; i++){
    ctx.fillRect(path[i][1]*30,path[i][0]*50,30,50);
  }
}
(function(){
  var k=Object.keys(wordColor);
  for(var i=0; i<random(6,20); i++){
    var y=random(0,h-1),
        x=random(0,w-1);
    while(map[y][x]!==0){
      y=random(0,h-1);
      x=random(0,w-1);
    }
    new Block(k[random(0,k.length-1)],y,x);
    while(map[y][x]!==0){
      y=random(0,h-1);
      x=random(0,w-1);
    }
    new Block(k[random(0,k.length-1)],y,x);
  }
})();


Render();
