<?php
include 'src/facebook.php';
$facebook = new Facebook(array(
  'appId'  => '123506954475209',
  'secret' => 'dd59aa1076f8c306cf8dd681f89f07e8',
  'cookie' => true,
));
 $user = $facebook->getUser(); 
?>