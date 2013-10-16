var imagenes = new Array({ruta:"imagen1.png", ganador:false}, {ruta:"imagen2.png", ganador:false}, 
						 {ruta:"imagen3.png", ganador:false}, {ruta:"imagen4.png", ganador:false},
						 {ruta:"imagen5.png", ganador:false}, {ruta:"imagen6.png", ganador:false},
						 {ruta:"imagen7.png", ganador:false}, {ruta:"imagen8.png", ganador:false},
						 {ruta:"imagen9.png", ganador:false}, {ruta:"imagen10.png", ganador:false}, 
						 {ruta:"imagen11.png", ganador:false}, {ruta:"imagen12.png", ganador:false},
						 {ruta:"imagen13.png", ganador:false}, {ruta:"imagen14.png", ganador:false},
						 {ruta:"imagen15.png", ganador:false}, {ruta:"imagen16.png", ganador:false});
var PAREJA = "";
var PRIMERO_ACTIVO = false;
var mat_imagenes = new Array( {id:"img1", pareja:1, im:"", id_im:0},{id:"img2", pareja:1, im:"", id_im:0},
                              {id:"img3", pareja:2, im:"", id_im:0},{id:"img4", pareja:2, im:"", id_im:0},
							  {id:"img5", pareja:3, im:"", id_im:0},{id:"img6", pareja:3, im:"", id_im:0},
							  {id:"img7", pareja:4, im:"", id_im:0},{id:"img8", pareja:4, im:"", id_im:0},
							  {id:"img9", pareja:5, im:"", id_im:0},{id:"img10", pareja:5, im:"", id_im:0},
							  {id:"img11", pareja:6, im:"", id_im:0},{id:"img12", pareja:6, im:"", id_im:0},
							  {id:"img13", pareja:7, im:"", id_im:0},{id:"img14", pareja:7, im:"", id_im:0},
							  {id:"img15", pareja:8, im:"", id_im:0},{id:"img16", pareja:8, im:"", id_im:0});
var arr_aleatorio = [];
var obj_activo;
var PAREJAS_HECHAS = 0;
var SEGUNDO_ACTIVO = false;
var OPORTUNIDADES = 10;
var DATOS = {};
var START = false;
$(document).on("ready", init);

function init(){
	active_tabs();
}
function active_tabs(){
	//console.log("activando tabs");
	for(i=0; i<mat_imagenes.length; ++i){
				 $("#"+mat_imagenes[i].id).on("mouseover", {obj:$("#"+mat_imagenes[i].id)}, alpha_over);
				 $("#"+mat_imagenes[i].id).on("mouseout", {obj:$("#"+mat_imagenes[i].id)}, alpha_out);
				 num = aleatorio();
				 $("#"+mat_imagenes[i].id).attr("rel", mat_imagenes[num].pareja);
				 mat_imagenes[i].im = imagenes[num].ruta;
				 //para cargar las imagenes en cache
				 	var image =  new Image();
	                    image.src =  "images/"+mat_imagenes[i].im;
	             $("#"+mat_imagenes[i].id).on("click", { id:mat_imagenes[i].id, ganador:imagenes[num].ganador, im:mat_imagenes[i].im, pareja:mat_imagenes[i].pareja, obj:$("#"+mat_imagenes[i].id)}, verificar_pareja);
	 }
	 $("#oport").append(OPORTUNIDADES);
}
function verificar_pareja(event){
	if(!START){
		crear_cronometro();
		START = true;
	}
	if(event.data.obj != obj_activo && !SEGUNDO_ACTIVO){
		var skin = $("#"+event.data.id).attr("src");
		var rel  = $("#"+event.data.id).attr("rel");
		//console.log(rel)
		$("#"+event.data.id).attr("src", "images/"+event.data.im);
		var img = event.data.id.split("img")[1];
		if(PRIMERO_ACTIVO){
			SEGUNDO_ACTIVO = true;
			if(obj_activo.attr("rel") == rel){
				PRIMERO_ACTIVO = false;
				SEGUNDO_ACTIVO = false;
				$("#"+event.data.id).unbind("click");
				obj_activo.unbind("click");

				++PAREJAS_HECHAS;
				console.log((mat_imagenes.length/2)+":::"+PAREJAS_HECHAS);
				if(mat_imagenes.length/2 == PAREJAS_HECHAS){
				   stop_cronometro();
				   var tm = TIEMPO.split(":");
				   var h = tm[0];
				   var m = tm[1];
				   var s = tm[2];
				   var ms = s.split(".")[1];
				   s = s.split(".")[0];
				   s = s.toString().length > 1 ? s : "0"+s;
				   s = s+ms;
				   console.log(s+ "::::::");
				   var puntos = h+m+"."+s;
				   var datos = JSON.parse(localStorage.data);
                   datos.puntos = puntos;
                   datos.tiempo = TIEMPO;
                   console.log(datos);

				    guardar_puntaje(datos, 2);
					alert("Felicidades has ganado el juego en un tiempo de : "+ TIEMPO );

				}

			}else{
				PRIMERO_ACTIVO = false;
				var im = obj_activo.attr("id").split("img")[1];
				obj_activo.oneTime(1400, function(){
					$(this).attr("src", skin);
					SEGUNDO_ACTIVO = false;
				  }
				);
				$("#"+event.data.id).oneTime(1400, function(){
					$(this).attr("src", skin);
					SEGUNDO_ACTIVO = false;
				  }
				);
				quitar_vida();
			
				if(OPORTUNIDADES == 0){
					alert("A perdido el Juego!,  por favor vuelva a intentarlo");
					window.location = "jugar.html";

				}
				$("#oport").html("");
				$("#oport").append(OPORTUNIDADES);
				obj_activo = null;
			}
		}else{
			obj_activo = event.data.obj;
			PAREJA = event.data.pareja;
			PRIMERO_ACTIVO = true;
		}
	 }
}
function quitar_vida(){
		--OPORTUNIDADES;
		//alert(OPORTUNIDADES)
		$("#vida"+OPORTUNIDADES).remove();
}
function guardar_puntaje(datos, opcion){
	$.ajax({
		type:"POST",
		dataType:"json",
		url:"php/C_funciones.php",
		data:{obj:datos, opn:opcion}
	}).done(function(msg){
		if(opcion == 1){
			sessionStorage.loggued = true;
			localStorage.data = JSON.stringify(datos);
			//window.location = "jugar.html";
		}
		console.log(msg);
		window.location = "jugar.html";
		
		
	})
}

function alpha_over(event){
	//event.data.obj.fadeTo(100, 0.5);
}
function alpha_out(event){
	//event.data.obj.fadeTo(100, 1);
}
function aleatorio() {
	////console.log("Repitiendo? : "+REPETIR);
	var long = imagenes.length;
	var r = Math.floor(Math.random() * long) 
	// alert(arr_aleatorio)
	for(i=0;i<arr_aleatorio.length;++i){	 
		if(r ==  arr_aleatorio[i]){
			r = Math.floor(Math.random() * long);
			i = -1;
		}
	}
	 arr_aleatorio.push(r);
	 return r;
}
