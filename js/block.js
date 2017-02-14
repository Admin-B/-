//WORD:COLOR
var wordColor={
  '가':'#FF5A00',
  '나':'#0084FF',
  '다':'#FE2EC8',
  '라':'#8315FF'
};
function Block(word,y,x){
  this.word =word;
  this.color=wordColor[word];
  if(!this.color){
    return;
  }
  this.y    =y;
  this.x    =x;

  this.width =30;
  this.height=50;
  map[y][x]  =this;
}
Block.prototype.draw=function(){
  //background
  ctx.fillStyle=this.color;
  ctx.fillRect(this.x*this.width,this.y*this.height,this.width,this.height);
  //text
  ctx.fillStyle='#fff';
  ctx.textBaseline='top';
  ctx.font='20px 맑은고딕';
  var l=4,t=9;
  ctx.fillText(this.word,this.x*this.width+l,this.y*this.height+t);
}
Block.prototype.search=function(y,x){
  Astar.init();
  var path=Astar.proc(this.y,this.x,y,x);
  var course=0;
  var prev={
    x:NaN,
    y:NaN
  };
  var dir={
    x:NaN,
    y:NaN
  };
  for(var i=0; i<path.length; i++){
    if(isNaN(prev.x) || isNaN(prev.y)){
      prev.y=path[i][0];
      prev.x=path[i][1];
      continue;
    }
    if(isNaN(dir.x) || isNaN(dir.y)){
      dir.y =path[i][0]-prev.y;
      dir.x =path[i][1]-prev.x;
      prev.y=path[i][0];
      prev.x=path[i][1];
      continue;
    }
    if(path[i][0]-prev.y !== dir.y && path[i][1]-prev.x !== dir.x){
      dir.y =path[i][0]-prev.y;
      dir.x =path[i][1]-prev.x;
      course++;
    }
    prev.y=path[i][0];
    prev.x=path[i][1];
    if(course>2){
      return false;
    }
  }
  return path;
}
