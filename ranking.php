<?php
	require_once('php/controlador.php');
	 include "includes/header.php"; 
	 include "php/C_funciones.php"; 
	 $ganadores  = mostrar_ganadores($fn);
	// print_r($ganadores);
?>
</head>

<body>
<div class="cont_ranking">
  <div class="cont_ganadores">
    <ul>
    <?php
     $i = 0;
	 $guitarra = false;
	 foreach($ganadores as $ganador){ 
	 if($i < 9){
	  $premio =  substr($ganador['premio_nombre'], 0, 16);
	  $nombre =  substr($ganador['user_nombres'], 0, 16);
	?>
     <li><span><?php print $premio."..."; ?></span><img  alt="<?php print $ganador['premio_nombre'] ?>" src="https://graph.facebook.com/<?php echo $ganador['user_fb_id']; ?>/picture"  width="72" height="72" >
        <span><?php print $nombre."..."; ?></span>
     </li>
    <?php
	 }else{
		 $guitarra = true;
		 $premio =  substr($ganador['premio_nombre'], 0, 16);
	     $nombre =  substr($ganador['user_nombres'], 0, 20);
	     $src 	 = "https://graph.facebook.com/".$ganador['user_fb_id']."/picture";
	 }
		++$i;
	 } ?>
    </ul>
  </div>
  <?php if($guitarra){ ?>
  <div class="ganador_guitarra">
   <img src="<?php print $src; ?>"  width="72" height="72" >
   <span><?php print $nombre; ?></span>
  </div>
  <?php } ?>
   <div class="terminos_ranking">
    		<?php include "includes/share-terminos.php"; ?>
   </div>
 </div>
</body>
</html>
