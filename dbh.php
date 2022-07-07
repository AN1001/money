<?php

$conn = pg_connect(getenv("postgres://famzfecldkdbgu:0ed5a04607d1f3e5009c30f8f7e26b54daa47d3d4a3cd96e65466f78ed951755@ec2-54-246-185-161.eu-west-1.compute.amazonaws.com:5432/d7lb9lcj3j0p16"));

if (!$conn) {
  $DATABASE_URL = getenv("DATABASE_URL");
  die("it seems like------error");
}
