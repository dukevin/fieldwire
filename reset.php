<?php
	include "mysql_link.php";

	$res = mysqli_query($link, "DELETE FROM projects");
	$res = mysqli_query($link, "DELETE FROM files");
?>