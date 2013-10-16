<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once('php/controlador.php');

		if ($user) {
			 try {
							// Proceed knowing you have a logged in user who's authenticated.
							$me = $facebook->api("/me");
							$permissions = $facebook->api("/me/permissions");
							if( !array_key_exists('publish_stream', $permissions['data'][0]) ) {
								header( "Location: " . $facebook->getLoginUrl(array("scope" => "publish_stream")) );
							}
							
							// Login or logout url will be needed depending on current user state.
							$logoutUrl = $facebook->getLogoutUrl();
				 } catch (FacebookApiException $e) {
							error_log($e);
							$user = null;
							
							$loginUrl = $facebook->getLoginUrl(array(
								'canvas' => 1,
								'fbconnect' => 0,
								'scope' => 'publish_stream, email'
							));
							echo '<script>parent.location="'.$loginUrl.'";</script>';
				}
							if(isset($_GET["state"]) and isset($_GET["code"])){
								header('Location:' . "https://www.facebook.com/exito/app_123506954475209");
								exit;
							}
			} else {
					  $loginUrl = $facebook->getLoginUrl(array(
							'canvas' => 1,
							'fbconnect' => 0,
							'scope' => 'publish_stream, email'
						));
						if(isset($_GET["state"]) and isset($_GET["code"])){
								header('Location:' . "https://www.facebook.com/exito/app_123506954475209");
								exit;
							}
						echo '<script>parent.location="'.$loginUrl.'"</script>';			
			}

?>