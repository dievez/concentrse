<?php 
class funciones {
	private $conn;
    public function __construct() { 
		$this->conn = new Conexions();
		$this->conn->start();
		date_default_timezone_set('America/Bogota'); 
    }
	public function check_conn(){
		return $this->conn->text_conexion();	
	}
	public function verificar_usuario_participando($email){
	   $sql = $this->conn->conn->prepare("SELECT * FROM usuarios WHERE email = ? " )or die(mysqli_error());
	   $sql->bind_param('s', $email);
	   $sql->execute();
	   $sql->store_result();
	   $meta = $sql->result_metadata();
	   while ($column = $meta->fetch_field()) {
	    	 $bindVarsArray[] = &$results[$column->name];
		}        
	 call_user_func_array(array($sql, 'bind_result'), $bindVarsArray);

	  $sql->fetch();
	  return $results['nombres'];
	}
	public function insertar_usuario($obj){
		//return $this->verificar_usuario_participando($obj['email']);
		if($this->verificar_usuario_participando($obj['email'])){
			return "participando";
		}
		$sql = $this->conn->conn->prepare("INSERT INTO `usuarios` SET nombres=?,email=?,facebookID=? " )or die(mysqli_error());
		$sql->bind_param('sss', $obj['nombre'], $obj['email'],$obj['facebookID']);
		$sql->execute();
		return $sql->affected_rows;
	}
	private function compara_puntos($email, $puntos){
      $sql = $this->conn->conn->prepare("SELECT puntos FROM usuarios WHERE email=? ")or die(mysqli_error());
      $sql->bind_param('s', $email);
	  $sql->execute();
	  $this->stmt_bind_assoc($sql, $row);
	   /*$sql->bind_result($id,$nombres,$email,$tiempo,$puntos,$facebookID);*/ 
	  //call_user_func_array(array($sql, 'bind_result'), $bindVarsArray);
	  $index = 0;
	  $pos = 0;
	  $arr = array();
	  while ($sql->fetch()) {
			
		    		if($row["puntos"] <= $puntos && $row["puntos"] != 0){
		    			return false;
		    		}
	   }
	  return true;
	}
	public function insertar_usuario_puntos($obj){
		if($this->compara_puntos($obj['email'],$obj['puntos'])){
			$sql = $this->conn->conn->prepare("UPDATE `usuarios` SET tiempo=?,puntos=? WHERE email=?" )or die(mysqli_error());
			$sql->bind_param('sss', $obj['tiempo'],$obj['puntos'],$obj['email']);
			$sql->execute();
			return $sql->affected_rows;
		}
		return false;
	}	
	public function get_mi_posicion($email){
	   $sql = $this->conn->conn->prepare("SELECT * FROM usuarios ORDER BY puntos ASC")or die(mysqli_error());
	   $sql->execute();
	   $this->stmt_bind_assoc($sql, $row);
	   /*$sql->bind_result($id,$nombres,$email,$tiempo,$puntos,$facebookID);*/ 
	  //call_user_func_array(array($sql, 'bind_result'), $bindVarsArray);
	  $index = 0;
	  $pos = 0;
	  $arr = array();
	  while ($sql->fetch()) {
	  	 	++$index;
			foreach( $row as $key=>$value )
		    {
		    	if($value == $email){
		    		$arr[0] = $row["puntos"] == 0 ? "N" : $index ;
		    		$arr[1] = $row["tiempo"];
		    	}
		    } 
	   }
	  return $arr;
	}
	public function get_puntajes(){
	   $sql = $this->conn->conn->prepare("SELECT * FROM usuarios WHERE puntos != 0 ORDER BY puntos ASC LIMIT 5" )or die(mysqli_error());
	   $sql->execute();
	   $this->stmt_bind_assoc($sql, $row);
	   /*$sql->bind_result($id,$nombres,$email,$tiempo,$puntos,$facebookID);*/ 
	  //call_user_func_array(array($sql, 'bind_result'), $bindVarsArray);
	  while ($sql->fetch()) {
			foreach( $row as $key=>$value )
		    {
		        $row_tmb[ $key ] = $value;
		    } 
		    $result[] = $row_tmb;
	   }
	  return $result;
	}
	private function stmt_bind_assoc (&$stmt, &$out) {
	    $data = mysqli_stmt_result_metadata($stmt);
	    $fields = array();
	    $out = array();

	    $fields[0] = $stmt;
	    $count = 1;

	    while($field = mysqli_fetch_field($data)) {
	        $fields[$count] = &$out[$field->name];
	       ++$count;
	    }    
	    call_user_func_array('mysqli_stmt_bind_result', $fields);
   }
}
?>
