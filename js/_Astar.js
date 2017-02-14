/*Spot*/
function Spot(y,x,w){
  this.f=0; //비용
  this.g=0; //시작점 부터의 비용
  this.h=0; //장애물을 고려하지 않고 최종점까지의 최소비용

  this.y=y;
  this.x=x;
  this.wall=w;
  this.prev=undefined;
}
Spot.prototype.addNeighbors=function(){
  this.neighbors=[];
  var x=this.x,
      y=this.y;
  if(y>0){
    this.neighbors.push(Astar.map[y-1][x]);
  }
  if(x>0){
    this.neighbors.push(Astar.map[y][x-1]);
  }
  if(x<w-1){
    this.neighbors.push(Astar.map[y][x+1]);
  }
  if(y<h-1){
    this.neighbors.push(Astar.map[y+1][x]);
  }
}
/*
  map
  openset
  closedset
  start
  end
*/
var Astar={
  init:function(){
    this.map=[];
    for(var i=0; i<h; i++){
      this.map[i]=[];
      for(var j=0; j<w; j++){
        this.map[i][j]=new Spot(i,j,!!map[i][j]);
      }
    }
    for(var i=0; i<h; i++){
      for(var j=0; j<w; j++){
        this.map[i][j].addNeighbors();
      }
    }
    this.openset  =[];
    this.closedset=[];
  },
  proc:function(sy,sx,ey,ex){
    this.start=this.map[sy][sx];
    this.end  =this.map[ey][ex];
    this.openset.push(this.start);
    var openset  =this.openset,
        closedset=this.closedset,
        start    =this.start,
        end      =this.end;
    start.wall=false;
    end.wall =false;
    while( 1 ){
      if(openset.length > 0){
        var current=openset[0];
        for(var i=0; i<openset.length; i++){
          if(openset[i].f<current.f){
            current=openset[i];
          }
        }
        if(current===end){
          var path=[];
          var temp=current;
          path.push([temp.y,temp.x]);
          while(temp.prev){
            path.push([temp.prev.y,temp.prev.x]);
            temp=temp.prev;
          }
          console.log('searched path');
          return path;
        }
        this.removeFromArray(openset,current);
        closedset.push(current);

        var neighbors=current.neighbors;
        for(var i=0; i<neighbors.length; i++){
          var n = neighbors[i];
          if(closedset.includes(n) || n.wall){
            continue;
          }
          var tg=current.g+1;
          if(openset.includes(n)){
            n.g=tg<n.g ? tg : n.g;
          }else{
            n.g=tg;
            openset.push(n);
          }
          n.g=tg;
          n.f=tg+this.heuristic(n,end);
          n.prev=current;
        }
      }else{
        console.warn('no solution');
        return false;
      }
    }
  },
  removeFromArray:function(arr,elt){
    for(var i=arr.length-1; i>=0; i--){
      if(arr[i]==elt){
        arr.splice(i,1);
      }
    }
  },
  heuristic:function(s,e){
    return Math.sqrt(Math.pow(e.x-s.x,2)+Math.pow(e.y-s.y,2));
  },
  start:undefined,
  end:undefined,
  map:undefined,
  openset:undefined,
  closedset:undefined,
};
