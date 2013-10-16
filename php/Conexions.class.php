<?php 
class Conexions {

	private $host;
	private $user;
	private $pass;
	private $bd;
	public  $conn; 

    public function __construct() { 
	   /* $this->host = "localhost";
		$this->user = "root";
		$this->pass = "";
		$this->bd   = "concentrese";*/
		$this->host = "localhost";
		$this->user = "cvasquez_dvelez";
		$this->pass = "basket2200.";
		$this->bd   = "cvasquez_concentrese";
    }
	public function start() {
		$this->conn = new mysqli($this->host, $this->user, $this->pass, $this->bd) or die(mysql_error());
		//mysqli_select_db(, $this->conn);
	}
	public function text_conexion() {
		return $this->conn;
	}
	public function close(){
		mysqli_close();
	}
}
?>
