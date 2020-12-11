//主程序,业务逻辑
(function(){
	var _DATA = [		//地图数据
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,2,2,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0],
		[1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
		[1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
		[1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
		[1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
		[1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
		[1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	],
	_GOODS = {			//能量豆
		'1,3':1,
		'26,3':1,
		'1,23':1,
		'26,23':1
	},
	_COS = [1,0,-1,0],
	_SIN = [0,1,0,-1],
	_COLOR = ['#F00','#F93','#0CF','#F9C'],//红,橙,蓝，粉
	_LIFE = 3,
	_SCORE = 0;		//得分

	var game = new Game('canvas');
	//启动页
	(function(){
		var stage = game.createStage();
		//logo
		stage.createItem({
			x:game.width/2,
			y:game.height*.45,
			width:100,
			height:100,
			frames:3,
			draw:function(context){
				var t = Math.abs(5-this.times%10);
				context.fillStyle = '#FFE600';
				context.beginPath();
				context.arc(this.x,this.y,this.width/2,t*.04*Math.PI,(2-t*.04)*Math.PI,false);
				context.lineTo(this.x,this.y);
				context.closePath();
				context.fill();
				context.fillStyle = '#000';
				context.beginPath();
				context.arc(this.x+5,this.y-27,7,0,2*Math.PI,false);
				context.closePath();
				context.fill();
			}
		});
		//游戏名
		stage.createItem({
			x:game.width/2,
			y:game.height*.6,
			draw:function(context){
				context.font = 'bold 42px Helvetica';
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillStyle = '#FFF';
				context.fillText('Pac-Man',this.x,this.y);
			}
		});
		//事件绑定
		stage.bind('keydown',function(e){
			switch(e.keyCode){
				case 13:
				case 32:
				game.nextStage();
				break;
			}
		});
	})();
	//游戏主程序
	(function(){
		var stage,map,beans,player,times;
		stage = game.createStage({
			update:function(){
				var stage = this;
				if(stage.status==1){								//场景正常运行
					items.forEach(function(item){
						if(map&&!map.get(item.coord.x,item.coord.y)&&!map.get(player.coord.x,player.coord.y)){
							var dx = item.x-player.x;
							var dy = item.y-player.y;
							if(dx*dx+dy*dy<750&&item.status!=4){		//物体检测
								if(item.status==3){
									item.status = 4;
									_SCORE += 10;
								}else{
									stage.status = 3;
									stage.timeout = 30;
								}
							}
						}
					});
					if(JSON.stringify(beans.data).indexOf(0)<0){	//当没有物品的时候，进入结束画面
						game.nextStage();
					}
				}else if(stage.status==3){		//场景临时状态
					if(!stage.timeout){
						_LIFE--;
						if(_LIFE){
							stage.resetItems();
						}else{
							game.nextStage();
							return false;
						}
					}
				}
			}
		});
		//绘制地图
		map = stage.createMap({
			x:60,
			y:10,
			data:_DATA,
			cache:true,
			draw:function(context){
				context.lineWidth = 2;
				for(var j=0; j<this.y_length; j++){
					for(var i=0; i<this.x_length; i++){
						var value = this.get(i,j);
						if(value){
							var code = [0,0,0,0];
							if(this.get(i+1,j)&&!(this.get(i+1,j-1)&&this.get(i+1,j+1)&&this.get(i,j-1)&&this.get(i,j+1))){
								code[0]=1;
							}
							if(this.get(i,j+1)&&!(this.get(i-1,j+1)&&this.get(i+1,j+1)&&this.get(i-1,j)&&this.get(i+1,j))){
								code[1]=1;
							}
							if(this.get(i-1,j)&&!(this.get(i-1,j-1)&&this.get(i-1,j+1)&&this.get(i,j-1)&&this.get(i,j+1))){
								code[2]=1;
							}
							if(this.get(i,j-1)&&!(this.get(i-1,j-1)&&this.get(i+1,j-1)&&this.get(i-1,j)&&this.get(i+1,j))){
								code[3]=1;
							}
							if(code.indexOf(1)>-1){
								context.strokeStyle=value==2?"#FFF":"#09C";
								var pos = this.coord2position(i,j);
								switch(code.join('')){
									case '1100':
										context.beginPath();
										context.arc(pos.x+this.size/2,pos.y+this.size/2,this.size/2,Math.PI,1.5*Math.PI,false);
										context.stroke();
										context.closePath();
										break;
									case '0110':
										context.beginPath();
										context.arc(pos.x-this.size/2,pos.y+this.size/2,this.size/2,1.5*Math.PI,2*Math.PI,false);
										context.stroke();
										context.closePath();
										break;
									case '0011':
										context.beginPath();
										context.arc(pos.x-this.size/2,pos.y-this.size/2,this.size/2,0,.5*Math.PI,false);
										context.stroke();
										context.closePath();
										break;
									case '1001':
										context.beginPath();
										context.arc(pos.x+this.size/2,pos.y-this.size/2,this.size/2,.5*Math.PI,1*Math.PI,false);
										context.stroke();
										context.closePath();
										break;
									default:
										var dist = this.size/2;
										code.forEach(function(v,index){
											if(v){
												context.beginPath();
												context.moveTo(pos.x,pos.y);
												context.lineTo(pos.x-_COS[index]*dist,pos.y-_SIN[index]*dist);
												context.stroke();
												context.closePath();							
											}
										});
								}
							}
						}
					}
				}
			}
		});
		//物品地图
		beans = stage.createMap({
			x:60,
			y:10,
			data:_DATA,
			frames:8,
			draw:function(context){
				for(var j=0; j<this.y_length; j++){
					for(var i=0; i<this.x_length; i++){
						if(!this.get(i,j)){
							var pos = this.coord2position(i,j);
							context.fillStyle = "#F5F5DC";
							if(_GOODS[i+','+j]){
								context.beginPath();
								context.arc(pos.x,pos.y,3+this.times%2,0,2*Math.PI,true);
								context.fill();
								context.closePath();
							}else{
								context.fillRect(pos.x-2,pos.y-2,4,4);
							}
						}
					}
				}
			}
		});
		//得分
		stage.createItem({
			x:690,
			y:100,
			draw:function(context){
				context.font = 'bold 28px Helvetica';
				context.textAlign = 'left';
				context.textBaseline = 'bottom';
				context.fillStyle = '#C33';
				context.fillText('SCORE',this.x,this.y);
				context.font = '28px Helvetica';
				context.textAlign = 'left';
				context.textBaseline = 'top';
				context.fillStyle = '#FFF';
				context.fillText(_SCORE,this.x+12,this.y);
			}
		});
		//状态文字
		stage.createItem({
			x:690,
			y:320,
			frames:25,
			draw:function(context){
				if(stage.status==2&&this.times%2){
					context.font = '24px Helvetica';
					context.textAlign = 'left';
					context.textBaseline = 'center';
					context.fillStyle = '#09F';
					context.fillText('PAUSE',this.x,this.y);
				}
			}
		});
		//生命值
		stage.createItem({
			x:705,
			y:540,
			width:30,
			height:30,
			draw:function(context){
				for(var i=0;i<_LIFE-1;i++){
					var x=this.x+40*i,y=this.y;
					context.fillStyle = '#FFE600';
					context.beginPath();
					context.arc(x,y,this.width/2,.15*Math.PI,-.15*Math.PI,false);
					context.lineTo(x,y);
					context.closePath();
					context.fill();
				}
			}
		});
		//NPC
		for(var i=0;i<4;i++){
			stage.createItem({
				width:30,
				height:30,
				orientation:3,
				color:_COLOR[i],
				location:map,
				coord:{x:12+i,y:14},
				vector:{x:12+i,y:14},
				type:2,
				frames:10,
				speed:1,
				timeout:Math.floor(Math.random()*120),
				update:function(){
					var new_map;
					if(this.status==3&&!this.timeout){
						this.status = 1;
					}
					if(!this.coord.offset){			//到达坐标中心时计算
						if(this.status==1){
							if(!this.timeout){		//定时器
								new_map = JSON.parse(JSON.stringify(map.data).replace(/2/g,0));
								var id = this._id;
								items.forEach(function(item){
									if(item._id!=id&&item.status==1){	//NPC将其它所有还处于正常状态的NPC当成一堵墙
										new_map[item.coord.y][item.coord.x]=1;
									}
								});
								this.path = map.finder({
									map:new_map,
									start:this.coord,
									end:player.coord
								});
								if(this.path.length){
									this.vector = this.path[0];
								}
							}
						}else if(this.status==3){
							new_map = JSON.parse(JSON.stringify(map.data).replace(/2/g,0));
							var id = this._id;
							items.forEach(function(item){
								if(item._id!=id){
									new_map[item.coord.y][item.coord.x]=1;
								}
							});
							this.path = map.finder({
								map:new_map,
								start:player.coord,
								end:this.coord,
								type:'next'
							});
							if(this.path.length){
								this.vector = this.path[Math.floor(Math.random()*this.path.length)];
							}
						}else if(this.status==4){
							new_map = JSON.parse(JSON.stringify(map.data).replace(/2/g,0));
							this.path = map.finder({
								map:new_map,
								start:this.coord,
								end:this._params.coord
							});
							if(this.path.length){
								this.vector = this.path[0];
							}else{
								this.status = 1;
							}
						}
						//是否转变方向
						if(this.vector.change){
							this.coord.x = this.vector.x;
							this.coord.y = this.vector.y;
							var pos = map.coord2position(this.coord.x,this.coord.y);
							this.x = pos.x;
							this.y = pos.y;
						}
						//方向判定
						if(this.vector.x>this.coord.x){
							this.orientation = 0;
						}else if(this.vector.x<this.coord.x){
							this.orientation = 2;
						}else if(this.vector.y>this.coord.y){
							this.orientation = 1;
						}else if(this.vector.y<this.coord.y){
							this.orientation = 3;
						}
					}
					this.x += this.speed*_COS[this.orientation];
					this.y += this.speed*_SIN[this.orientation];
				},
				draw:function(context){
					var isSick = false;
					if(this.status==3){
						isSick = this.timeout>80||this.times%2?true:false;
					}
					if(this.status!=4){
						context.fillStyle = isSick?'#BABABA':this.color;
						context.beginPath();
						context.arc(this.x,this.y,this.width*.5,0,Math.PI,true);
						switch(this.times%2){
							case 0:
							context.lineTo(this.x-this.width*.5,this.y+this.height*.4);
							context.quadraticCurveTo(this.x-this.width*.4,this.y+this.height*.5,this.x-this.width*.2,this.y+this.height*.3);
							context.quadraticCurveTo(this.x,this.y+this.height*.5,this.x+this.width*.2,this.y+this.height*.3);
							context.quadraticCurveTo(this.x+this.width*.4,this.y+this.height*.5,this.x+this.width*.5,this.y+this.height*.4);
							break;
							case 1:
							context.lineTo(this.x-this.width*.5,this.y+this.height*.3);
							context.quadraticCurveTo(this.x-this.width*.25,this.y+this.height*.5,this.x,this.y+this.height*.3);
							context.quadraticCurveTo(this.x+this.width*.25,this.y+this.height*.5,this.x+this.width*.5,this.y+this.height*.3);
							break;
						}
						context.fill();
						context.closePath();
					}
					context.fillStyle = '#FFF';
					if(isSick){
						context.beginPath();
						context.arc(this.x-this.width*.15,this.y-this.height*.21,this.width*.08,0,2*Math.PI,false);
						context.arc(this.x+this.width*.15,this.y-this.height*.21,this.width*.08,0,2*Math.PI,false);
						context.fill();
						context.closePath();
					}else{
						context.beginPath();
						context.arc(this.x-this.width*.15,this.y-this.height*.21,this.width*.12,0,2*Math.PI,false);
						context.arc(this.x+this.width*.15,this.y-this.height*.21,this.width*.12,0,2*Math.PI,false);
						context.fill();
						context.closePath();
						context.fillStyle = '#000';
						context.beginPath();
						context.arc(this.x-this.width*(.15-.04*_COS[this.orientation]),this.y-this.height*(.21-.04*_SIN[this.orientation]),this.width*.07,0,2*Math.PI,false);
						context.arc(this.x+this.width*(.15+.04*_COS[this.orientation]),this.y-this.height*(.21-.04*_SIN[this.orientation]),this.width*.07,0,2*Math.PI,false);
						context.fill();
						context.closePath();
					}
				}
			});
		}
		items = stage.getItemsByType(2);
		//主角
		player = stage.createItem({
			width:30,
			height:30,
			type:1,
			location:map,
			coord:{x:13.5,y:23},
			orientation:2,
			speed:2,
			frames:10,
			update:function(){
				var coord = this.coord;
				if(!coord.offset){
					if(this.control.orientation!='undefined'){
						if(!map.get(coord.x+_COS[this.control.orientation],coord.y+_SIN[this.control.orientation])){
							this.orientation = this.control.orientation;
						}
					}
					this.control = {};
					var value = map.get(coord.x+_COS[this.orientation],coord.y+_SIN[this.orientation]);
					if(value==0){
						this.x += this.speed*_COS[this.orientation];
						this.y += this.speed*_SIN[this.orientation];
					}else if(value<0){
						this.x -= map.size*(map.x_length-1)*_COS[this.orientation];
						this.y -= map.size*(map.y_length-1)*_SIN[this.orientation];
					}
				}else{
					if(!beans.get(this.coord.x,this.coord.y)){	//吃豆
						_SCORE++;
						beans.set(this.coord.x,this.coord.y,1);
						if(_GOODS[this.coord.x+','+this.coord.y]){	//吃到能量豆
							items.forEach(function(item){
								if(item.status==1||item.status==3){	//如果NPC为正常状态，则置为临时状态
									item.timeout = 450;
									item.status = 3;
								}
							});
						}
					}
					this.x += this.speed*_COS[this.orientation];
					this.y += this.speed*_SIN[this.orientation];
				}
			},
			draw:function(context){
				context.fillStyle = '#FFE600';
				context.beginPath();
				if(stage.status!=3){	//玩家正常状态
					if(this.times%2){
						context.arc(this.x,this.y,this.width/2,(.5*this.orientation+.20)*Math.PI,(.5*this.orientation-.20)*Math.PI,false);
					}else{
						context.arc(this.x,this.y,this.width/2,(.5*this.orientation+.01)*Math.PI,(.5*this.orientation-.01)*Math.PI,false);
					}
				}else{	//玩家被吃
					if(stage.timeout) {
						context.arc(this.x,this.y,this.width/2,(.5*this.orientation+1-.02*stage.timeout)*Math.PI,(.5*this.orientation-1+.02*stage.timeout)*Math.PI,false);
					}
				}
				context.lineTo(this.x,this.y);
				context.closePath();
				context.fill();
			}
		});
		//事件绑定
		stage.bind('keydown',function(e){
			switch(e.keyCode){
				case 13: //回车
				case 32: //空格
				this.status = this.status==2?1:2;
				break;
				case 39: //右
				player.control = {orientation:0};
				break;
				case 40: //下
				player.control = {orientation:1};
				break;
				case 37: //左
				player.control = {orientation:2};
				break;
				case 38: //上
				player.control = {orientation:3};
				break;
			}
		});
	})();
	//结束画面
	(function(){
		var stage = game.createStage();
		//游戏结束
		stage.createItem({
			x:game.width/2,
			y:game.height*.35,
			draw:function(context){
				context.fillStyle = '#FFF';
				context.font = 'bold 48px Helvetica';
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillText('GAME OVER',this.x,this.y);
			}
		});
		//记分
		stage.createItem({
			x:game.width/2,
			y:game.height*.5,
			draw:function(context){
				context.fillStyle = '#FFF';
				context.font = '20px Helvetica';
				context.textAlign = 'center';
				context.textBaseline = 'middle';
				context.fillText('FINAL SCORE: '+(_SCORE+50*Math.max(_LIFE-1,0)),this.x,this.y);
			}
		});
		//事件绑定
		stage.bind('keydown',function(e){
			switch(e.keyCode){
				case 13: //回车
				case 32: //空格
				_SCORE = 0;
				_LIFE = 3;
				var st = game.setStage(1);
				st.reset();
				break;
			}
		});
	})();
	game.init();
})();
