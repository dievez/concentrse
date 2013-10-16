if(!sessionStorage.loggued){
	window.location = "index.html";
}
$(document).on("ready", init);

function init(){
	$(".btnCerrar").on("click", function(){
		logout();		
	});
    get_ranking();
	//if(!JUGANDO)
	
	DATAR = JSON.parse(localStorage.data);
	//crear_cronometro();
}
var JUGANDO = false;
var mili = 0;
var sec  = 0;
var min  = 0;
var hora = 0;
var primera = false;
var segunda = false;
var tercera = false;
var interval;
var TIEMPO = "";
var DATAR;
//var DATA_RANKING;
function get_ranking(){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"php/C_funciones.php",
		data:{opn:3}
	}).done(function(msg){
		//console.log(msg);
		crear_ranking(msg);
		//DATA_RANKING = msg;		
	});
}
function traer_position(ema){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"php/C_funciones.php",
		data:{opn:4,email:ema}
	}).done(function(msg){
		console.log(msg);
		$(".ranking ul").append(obj_ranking(DATAR.facebookID, msg[1], msg[0], "last"));
		//DATA_RANKING = msg;		
	});
}
function crear_ranking(data){
	var esta = false;
	for(var i in data){
		console.log(i)
		if(data[i].email == DATAR.email){
			$(".ranking ul").append(obj_ranking(data[i].facebookID, data[i].tiempo, false, "last"));
			esta = true;
		}else{
			$(".ranking ul").append(obj_ranking(data[i].facebookID, data[i].tiempo));
	    }
		
	}
	if(!esta)traer_position(DATAR.email);
}
function crear_cronometro(){
 //   alert("COMENZAR A JUGAR");
	interval = setInterval(cronometro, 1);

}
function stop_cronometro(){
	clearInterval(interval);
}
function cronometro(){
	var smili = mili == 1000? "999" : mili.toString();

	if(smili.length == 1){
		smili = "0"+"0"+smili;
	}else if(smili.length == 2){
		smili = "0"+smili;
	}
	//alert(smili)
	TIEMPO = hora+":"+min+":"+sec+"."+smili;
	if(min % 60  == 0 && tercera){
		++hora;
		min=0;
	}
	if(sec % 60  == 0 && segunda){
		++min;
		sec=0;
		tercera = true;
	}else{
		tercera = false;
	}
	if(mili % 1000  == 0 && primera ){
		++sec;
		mili=0;
		segunda = true;
	}else{
		segunda = false;
	}
    mili += 5;
    primera = true;
    //console.log(hora+"::"+min+"::"+sec+"::"+mili);
    
   // TIEMPO = hora+":"+min+":"+sec+"."+mili;
	$(".cronometro").html(TIEMPO);
	//setTimeout(cronometro, 1);
}
var POSICION = 0;
function obj_ranking(fbId, tiempo, msg, clase){
	console.log(fbId);
	var url   = fbId.toString() == "0" ? "images/imgUser.png" : "http://graph.facebook.com/"+fbId+"/picture" 
	++POSICION;
	var pos = msg ? msg : POSICION;
	return '<li class='+clase+'>'+
	        '<div class="contRankNumber">'+
            	'<div class="rankNumber">'+pos+'</div>'+
            '</div>'+
            '<div class="rankImage"><img src="'+url+'" /></div>'+
            '<div class="rankTime">'+tiempo+'</div>'+
           '</li>';
}