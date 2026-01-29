<?php
$host = "localhost"; 
$user = "root";
$pass = ""; 
$db   = "usuarios";

$conn = new mysqli($host, $user, $pass, $db);

if($conn->connect_error) {die("error de conexion:". $conn->connect_error);}
?>