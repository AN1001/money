<?php

$conn = pg_connect(getenv("DATABASE_URL"));

if (!$conn) {
  die("it seems like------error");
}
