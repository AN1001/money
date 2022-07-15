<?php
require_once 'dbh.php';
$username = $_COOKIE["username"];
$graphData = $_COOKIE["graphData"];

$tableUpdate = "UPDATE userinfo SET graphdata = '$graphData' WHERE username = '$username'";
pg_query($conn, $tableUpdate);
