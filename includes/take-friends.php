<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once('php/controlador.php');
	$friends = $facebook->api('/me/friends');
    $friends = $friends['data'];
?>