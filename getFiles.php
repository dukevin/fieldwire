<?php
	include "mysql_link.php";
	$proj = $_POST["project"];
	$res = mysqli_query($link, "SELECT id FROM projects WHERE name='".$proj."'");
	$row = mysqli_fetch_assoc($res);
	$id = $row["id"];
	$res = mysqli_query($link, "SELECT * FROM files WHERE project='".$id."'");

	if(mysqli_num_rows($res) > 0)
	{
		while($row = mysqli_fetch_assoc($res))
			$rows[] = $row;
		echo json_encode($rows);
	}
	else
		die("failed");
?>