<?php
include "mysql_link.php";

$file = $_POST["name"];
$proj = $_GET["proj"];

$res = mysqli_query($link, "SELECT id FROM projects WHERE name='$proj'");
$row = mysqli_fetch_assoc($res);

$res = mysqli_query($link, "INSERT INTO files (name, display, version, project) VALUES ('".$file[0]."', '".pathinfo($file[0], PATHINFO_FILENAME)."', '1', '".$row["id"]."')");

?>