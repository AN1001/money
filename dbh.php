<?php

echo getenv("DATABASE_URL");
$conn = pg_connect("host=ec2-54-246-185-161.eu-west-1.compute.amazonaws.com port=5432 dbname=d7lb9lcj3j0p16 user=famzfecldkdbgu
 password=0ed5a04607d1f3e5009c30f8f7e26b54daa47d3d4a3cd96e65466f78ed951755");


if (!$conn) {
  $DATABASE_URL = getenv("DATABASE_URL");
  echo $DATABASE_URL;
  die("it seems like------error");
}
