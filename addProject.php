<?php
	include "mysql_link.php";

	$projectName = $_POST["projectName"];
	$res = mysqli_query($link, "INSERT INTO projects (name) VALUES ('$projectName')");
	echo $res ? "success" : "fail";
?>