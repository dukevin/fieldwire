<?php
	$_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
	$link = mysqli_connect("localhost", "fieldwire", "password", "fieldwire");
	if(mysqli_connect_errno() || !$link)
		die("A connection error has occurred");
	/*
		create table projects (id int not null primary key auto_increment, name varchar(2555));

	*/
?>