<?php
	include 'includes/header.php';
	if(isset($_COOKIE['me'])){
		$me = unserialize($_COOKIE['me']);
		
	}else{
		include "includes/take_user.php";
	}
	include "includes/take-friends.php";
?>
<?php
$arr = array();
		foreach($friends as $friend){
			$arr[] = $friend;
		}
echo '<script>
		 var ARR_AMIGOS   = '.json_encode($arr).';
		 var MI_NOMBRE = '.json_encode($me['name']).';
		 var MYID         = '.$me["id"].';
	  </script>';
?>
</head>
<body>
<div class="wrapper_premios">
 
<div class="amigos_wrap">
           	<div class="buscador-ami"><input name="" onClick="clean(this)" type="text" value="Buscar amigo..." onKeyUp="filtrar_nombres(this)" /></div>
             <br style="clear:both">
           <form action="enviar.php" method="post" id="invitefacebookfriends">
           
              <div class="amigos_item">
               
                <ul>
               <!-- lo paso a version javascript para el buscador fn_friends()  -->  
                <?php /* foreach($friends as $friend) { */ ?>
               
                <li>
                 <div class="inp-amigo" ><input type="checkbox" name="friendids[]" value="<?php echo $friend['id'];?>"  /></div>
               <img src="https://graph.facebook.com/<?php echo $friend['id']; ?>/picture" width="30" height="30" /><span><?php echo $friend['name'];?></span>
               </li>
                <?php /*  } */?>
                </ul> 
              </div>  
             </form>
           <div class="contador-amigos">
             	 <div class="cant-amigos-select" >0</div>
            </div>
         </div>
         	
</div>
 <div class="terminos_premios terminos_invitar">
    <?php include "includes/share-terminos.php"; ?>
 </div>
 <div class="share-ingresar-cedula">
    <?php include "includes/share-terminos.php"; ?>
 </div>
 <div class="btn_comenzar_invitar_amigos" onClick="concatenar_dar();"></div>
</div>        
</body>
</html>
