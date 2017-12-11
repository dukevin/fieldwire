<?php
ini_set("log_errors", 1);
ini_set("error_log", "php-error.log");
error_reporting(E_ALL | E_STRICT);

$link = mysqli_connect("localhost", "fieldwire", "password", "fieldwire");
	if(mysqli_connect_errno() || !$link)
		die("A connection error has occurred");
require('UploadHandler.php');
$project = $_GET["proj"];
$upload_handler = new UploadHandler();

//$res = mysqli_query($link, "INSERT INTO files (name, display, version, project) VALUES ('".$project."', '".$project."', '1', '1')");

