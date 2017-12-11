<?php
	include "mysql_link.php";

	$res = mysqli_query($link, "SELECT name from projects");
	$str = "";
	if(mysqli_num_rows($res) > 0)
	{
		while($row = mysqli_fetch_assoc($res))
			$str .= $row["name"]. "\n";
		echo $str;
	}
	else
		echo false;
?>