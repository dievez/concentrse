// JavaScript Document
$(document).ready(init);
var DATOS_CHECK_ACTIVO = false;
var CHECK_ME_GUSTA = false;
var PREMIOS_DISPONIBLES = 10;
var imagenes = new Array({ruta:"imagen1.png", ganador:false}, {ruta:"imagen2.png", ganador:false}, 
						 {ruta:"imagen3.png", ganador:false}, {ruta:"imagen4.png", ganador:false},
						 {ruta:"imagen5.png", ganador:false}, {ruta:"imagen6.png", ganador:false},
						 {ruta:"imagen7.png", ganador:false}, {ruta:"imagen8.png", ganador:false},
						 {ruta:"imagen9.png", ganador:false}, {ruta:"imagen1.png", ganador:false}, 
						 {ruta:"imagen2.png", ganador:false}, {ruta:"imagen3.png", ganador:false},
						 {ruta:"imagen4.png", ganador:false}, {ruta:"imagen5.png", ganador:false},
						 {ruta:"imagen6.png", ganador:false}, {ruta:"imagen7.png", ganador:false});
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
var PROCESO = 0;
var OPORTUNIDADES = 0;
var PARSEANDO_MAT = 0;
	//para un 3,3% de posibiilidades de salir ganador
var PORCENTAJE_GANAR = 1;
var ALEATORIO_CALCULADO = false;
var PREMIADO = ganador();
var	GANADOR  = ganador();
var CANTIDAD_AMIGOS = 5;
var SEGUNDO_ACTIVO = false;
var REPETIR = false;
var REPETIDOS = 0;
var JUGANDO = false;
var ID_PREMIO = 0;
var NOMBRE_PREMIO = "";
var ARR_DIAS_HORAS = new Array({dia:7,  horas:[17, 18]},
                               {dia:10, horas:[14]}, 
							   {dia:11, horas:[10, 14]},
							   {dia:12, horas:[10, 14]},
							   {dia:13, horas:[10, 14]},
							   {dia:14, horas:[14]});
var HORAS_DE_CHECKEO1 = 20;
var HORAS_DE_CHECKEO2 = 18;
var GANADO = false;
//TIEMPO PARA QUE SE RESETEE EL JUEGO EXPRESADO EN MINUTOS;
var TIEMPO_RESET = 13;
function init(){
	//setTimeout(check_premio,3000);
	//check_premio();
	

	var hora = new Date();
    for(var i in ARR_DIAS_HORAS){
		if(ARR_DIAS_HORAS[i].dia == hora.getDay()){
			
				HORAS_DE_CHECKEO1 = ARR_DIAS_HORAS[i].horas[0];
				HORAS_DE_CHECKEO2 = ARR_DIAS_HORAS[i].horas[1]?ARR_DIAS_HORAS[i].horas[1]:25;
		}
	}
	if(JUGANDO){
		activar_timer_reset();
		$(".cant_total_jugar").html(PREMIOS_DISPONIBLES);
		check_premios_entregados();
	}

	$(".invitaciones-btnContinuar").click(function(e) {
		if(YA_CINCO){
        	ir_juego();
		}
    });
	$(".invitaciones-btnContinuar").hide();
	if(CHECK_ME_GUSTA){
		check_megusta();
	}
	$(".datos-btnContinuar").click(check_datos);
	$(".datos-check").click(function(e){
		  if(!DATOS_CHECK_ACTIVO){
			  DATOS_CHECK_ACTIVO = true;
			   $(".datos-check").css("background-image","url(images/checkon.jpg)");
		  }else{
			  DATOS_CHECK_ACTIVO = false;
			  $(".datos-check").css("background-image", "url(images/checkoff.jpg)");
		  }
		});
   	 if(PREMIADO == GANADOR){
		   consultar_premios_hoy();
		  /*  */
	}else if(hora.getHours() == HORAS_DE_CHECKEO1 || hora.getHours() == HORAS_DE_CHECKEO2){
			console.log(hora.getHours()+"consultando");
		consultar_premios_hoy();
		
	} else{
		active_tabs();
	}

	active_tabs();
}
function activar_timer_reset(){
	if(TIEMPO_RESET == 0){
		exit();
	}else{
		console.log(TIEMPO_RESET+":::");
		--TIEMPO_RESET;
		setTimeout(activar_timer_reset, 60000);
	}
	
}
function exit(){
	if(window.location.href.indexOf("jugar") > -1 && GANADO == false) {
	//	console.log("****");
       $.ajax({
			type: "POST",
			url: "php/C_funciones.php",
			data:{opn:"actualizar_temporal_premio", premio:ID_PREMIO},
			dataType: "json",
			success:mostrar_temporal
  		 });
    }
}
function mostrar_temporal(data){
	if(data){
		alert("El Juego se reiniciará por inactividad o exceso de tiempo");
		window.location = "jugar.php";
	}
}
//consulta si hay premios disponibles hoy;
function consultar_premios_hoy(){
	$.ajax({
		type: "POST",
		url: "php/C_funciones.php",
		data:{opn:"consultar_premios_hoy"},
		dataType: "json",
		success:mostrar_premios_hoy
   });
}
function ir_datos(){
	window.location = "jugar.php";
}
function mostrar_premios_hoy(data){
	if(data.length > 0){
		ID_PREMIO =  data[0]["premio_id"];
		NOMBRE_PREMIO = data[0]["premio_nombre"]
		 var a_repetir = imagenes[randomic(imagenes.length)].ruta;
			 imagenes[randomic(imagenes.length)].ganador = true;
			 var index = 0;
			// while(index < 2){
				 for(var t in imagenes){
					 if(imagenes[t].ruta ==  a_repetir)imagenes[t].ganador = true;   
					 var pos = randomic(imagenes.length);
					 if(imagenes[pos].ruta != a_repetir && index < 2){
						 ++index;
						 //console.log("imagen a cambiar"+imagenes[pos].ruta);
						 imagenes[pos].ruta = a_repetir;
						 imagenes[pos].ganador = true;
						 //console.log("imagen a"+imagenes[pos].ruta);
					 }
				 }
				 //if() 
			 //}
			 //console.log(a_repetir);
			 REPETIR = true;
			 active_tabs();
	}else{
		active_tabs();
	}
}
function active_tabs(){
	//console.log("activando tabs");
	for(i=0; i<mat_imagenes.length; ++i){
				 $("#"+mat_imagenes[i].id).on("mouseover", {obj:$("#"+mat_imagenes[i].id)}, alpha_over);
				 $("#"+mat_imagenes[i].id).on("mouseout", {obj:$("#"+mat_imagenes[i].id)}, alpha_out);
				 num = aleatorio();
				 mat_imagenes[i].im = imagenes[num].ruta;
				 //para cargar las imagenes en cache
				 	var image =  new Image();
	                    image.src =  "images/"+mat_imagenes[i].im;
	             $("#"+mat_imagenes[i].id).on("click", { id:mat_imagenes[i].id, ganador:imagenes[num].ganador, im:mat_imagenes[i].im, obj:$("#"+mat_imagenes[i].id)}, 		verificar_pareja);
	 }
}
function check_premios_entregados(){
	$.ajax({
		type: "POST",
		url: "php/C_funciones.php",
		data:{opn:"verifica_premios"},
		dataType: "json",
		success:mostrar_entregados
   });
}
function mostrar_entregados(data){
	setTimeout(check_premios_entregados, 1000);
	//console.log(data);
	$(".cant_ent_jugar").html(data);
}
function randomic(len){
			var r = Math.floor(Math.random() * len);
			return r;
}
function ir_juego(){
	window.location = "./jugar.php";
}
function ir_url(id){
	var arr = FRIENDS.split("|");
	var arr2 = FRIENDS_GETS.split("|");
	for(var h=0; h< arr.length; ++h){
		
	   for(var j=0; j< arr2.length; ++j){
		  // alert(arr[h]+" :::: "+arr2[j])
		   if(arr[h] == arr2[j]){
			   arr2[j] = "";
			 
		   }
	   }
	}

    var ar = Array();
	
	ar = ar.concat(arr, arr2);
	var friends = "";
	for(var i=0;i< ar.length;++i){
		if( ar[i].length > 3){
			if(i+1 == ar.length){
			   friends += ar[i];
			}else{
			   friends += ar[i] + "|";
			}
		}
	}
	window.location = "invitar.php?pagina="+id+"&friends="+friends;
}

function verificar_ganador_insertado(data){
		if(data != null){
			GANADO = true;
			$("#inline3 div").html(NOMBRE_PREMIO);
			$("#gratz").trigger("click");
		}
}
function check_megusta(){
	$.ajax({
		type: "POST",
		url: "php/C_funciones.php",
		data:{opn:2},
		dataType: "json",
		success:verificar_me_gusta
   });
}

function verificar_me_gusta(data){
	if(data != null){
		window.location = "instrucciones.html";
	}
}
function check_datos(){
	if($("#datos-nom").val() != "" && $("#datos-ced").val() != ""){
		 if(validateEmail($("#datos-ema").val())){
			 if(DATOS_CHECK_ACTIVO){
				 guardar_datos($("#datos-nom").val(), $("#datos-ced").val(), $("#datos-ema").val());
			 }else{
				 alert("Debe aceptar los términos y condiciones");
			 }
		 }else{
			 alert("por favor ingrese un correo electrónico válido!");
		 }
	}else{
		alert("Todos los campos son obligatorios");
	}
}
function guardar_datos(nnom, cced, eema){
	$.ajax({
		type: "POST",
		url: "php/C_funciones.php",
		data:{opn:1, nom:nnom, ced:cced, ema:eema, id_face:ID_FACE},
		dataType: "json",
		success:parse_data
   });
}
function parse_data(data){
	
	if(!Boolean(data)){
		alert("Encontramos un Error!! Esto puede ser debido a que este usuario ya participó en el juego o por problemas técnicos dado este caso por favor comuniquese con nosotros");
	}else{
		window.location = "invitar.php?pagina=0";
	}
	
}
function centrar_paginador(){
	var lf = (810 / 2 ) - ($(".paginador").width() / 2)
	$(".paginador").css("margin-left", lf);
}
function concatenar(){
	//alert(FRIENDS)
	var arr1 = Array();
	FRIENDS = "";
	$("input[type=checkbox]:checked").each(function() {
	
				arr1.push($(this).val())
    }); 
	for(var j=0;j< arr1.length; ++j){
		if(arr1[j].length > 3){
			if(j+1 ==arr1.length){  
			  FRIENDS += arr1[j];
			}else{
			  FRIENDS += arr1[j] + "|";
			}
		}
	}
	var check_last  = FRIENDS.slice(FRIENDS.length-1, FRIENDS.length);
	if(check_last == "|"){
		var a = FRIENDS.slice(0, FRIENDS.length-1);
		FRIENDS = a;
	}
	var arr2 = FRIENDS_GETS.split("|");
	var long = arr2.length + arr1.length;
	if(long > CANTIDAD_AMIGOS){
		
		llamar_log();
	}
}

function llamar_log(){
	var allfriends  = "";
	if(FRIENDS_GETS != ""){
	    allfriends = FRIENDS+"|"+FRIENDS_GETS;
	}else{
		allfriends = FRIENDS;
	}
var ids = allfriends.split("|").join(",")
	  FB.ui({method: 'apprequests',
		message: 'Lo invitamos a que participe de este excelente concurso!!',
		to: ids
	  }, requestCallback);
}
function requestCallback(e){
	if(e){
		$(".invitaciones-btnContinuar").fadeTo(500, 1);
		YA_CINCO = true;
	}
}
function validateEmail(elementValue){  
       var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
       return emailPattern.test(elementValue);  
}  
function alpha_over(event){
	event.data.obj.fadeTo(100, 0.5);
}
function alpha_out(event){
	event.data.obj.fadeTo(100, 1);
}
function insertar_ganador(){
	//console.log(MAT_ME);
	var id 	  = MAT_ME["id"];
	$.ajax({
		type: "POST",
		url: "php/C_funciones.php",
		data:{opn:"insertar_ganador", idpremio:ID_PREMIO, idfb:id},
		dataType: "json",
		success:verificar_ganador_insertado
   });
}
function verificar_pareja(event){
if(event.data.obj != obj_activo && !SEGUNDO_ACTIVO){
	$("#"+event.data.id).attr("src", "images/"+event.data.im);
	var img = event.data.id.split("img")[1];
	if(PRIMERO_ACTIVO){
		SEGUNDO_ACTIVO = true;
		if(PAREJA == event.data.im){
			PRIMERO_ACTIVO = false;
			SEGUNDO_ACTIVO = false;
			$("#"+event.data.id).unbind("click");
			obj_activo.unbind("click");
			++PROCESO;
			if(event.data.ganador)REPETIDOS += 2;
			if(REPETIDOS ==  4){
				insertar_ganador();
				//alert("Felicidades a ganado el juego!!");
			}else if(PROCESO == 9){
				$("#animo").trigger("click");
			}
		}else{
			PRIMERO_ACTIVO = false;
			var im = obj_activo.attr("id").split("img")[1];
			obj_activo.oneTime(1400, function(){
				$(this).attr("src", "images/img"+im+".jpg");
				SEGUNDO_ACTIVO = false;
			  }
			);
			$("#"+event.data.id).oneTime(1400, function(){
				$(this).attr("src", "images/img"+img+".jpg");
				SEGUNDO_ACTIVO = false;
			  }
			);
			++OPORTUNIDADES;
			$("#oport").html("");
			$("#oport").append(OPORTUNIDADES);
			obj_activo = null;
		}
	}else{
		obj_activo = event.data.obj;
		PAREJA = event.data.im;
		PRIMERO_ACTIVO = true;
	}
 }
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
function ganador(){
  var r =  Math.floor(Math.random() * PORCENTAJE_GANAR);
  return r;
}
function reiniciar(){
	window.location = "jugar.php";
}
