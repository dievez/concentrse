<?php
	require_once('php/controlador.php');
	 include "includes/header.php";

	 $ya_ganador = false;
	 if(!isset($_GET['errorn'])){
				 include "includes/take_user.php";
					 setcookie('me', serialize($me));
	  }else{
		  $ya_ganador = true;
	  }
	  include "php/C_funciones.php";
	 $participando = verificar_usuario_participando($fn, $me['id']);
	 if($participando)header("Location:jugar.php");
?>
</head>

<body>

<div class="cont_datos">
<?php if(!$ya_ganador) { ?>
 <div class="campos_datos">
  <form id="datos" name="datos" action="php/C_funciones.php" method="post" >
  <div class="input_datos"> 
    <input id="f_nombres" name="f_nombres" type="text" value="<?php print $me['name']; ?>" >
  </div>
  <br /><br /><br />
  <div class="input_datos">
    <input id="f_cedula" name="f_cedula" type="text" >
    <input type="hidden" id="f_fb_id" name="f_fb_id" value="<?php print $me['id']; ?>"  >
    <input type="hidden" id="f_fb_phone" name="f_fb_phone" value="<?php print isset($me['phone'])?$me['phone']:0; ?>"  >
    <input type="hidden" id="f_fb_phone" name="f_fb_sex" value="<?php print $me['gender']; ?>"  >
  </div>
  <br /><br /><br />
  <div class="input_datos">
    <input id="f_email" name="f_email" type="text"  value="<?php print $me['email']; ?>"   >
  </div>
  </form>
 </div>
 <div class="terminos_premios terminos_datos">
    <?php include "includes/share-terminos.php"; ?>
 </div>
 <div class="btn_comenzar_datos"></div>
 <?php }else{
	 print "Usted ya es el felíz ganador de uno de nuestros premios Éxito Juanes Tour, en poco tiempo nos pondremos en contacto con usted para hacerle entrega del premio";
 }?>
 </div>
</body>
</html>
