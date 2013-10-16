<?php
include "Conexions.class.php";
include "funciones.class.php";
$fn = new funciones();
if(isset($_POST['opn'])){
	if ($_POST['opn'] == 1) {
		   echo json_encode($fn->insertar_usuario($_POST["obj"]));
	}
	if ($_POST['opn'] == 2) {
		   echo json_encode($fn->insertar_usuario_puntos($_POST["obj"]));
	}
	if ($_POST['opn'] == 3) {
		   echo json_encode($fn->get_puntajes());
	}
	if ($_POST['opn'] == 4) {
		   echo json_encode($fn->get_mi_posicion($_POST['email']));
	}
}
 // echo json_encode("Diego");
?>