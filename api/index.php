<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headets: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true *');
header("Content-type: json/application");

require_once "connect.php";
require_once "func.php";

$method = $_SERVER["REQUEST_METHOD"];

$q = $_GET['q'];
$params = explode("/", $q);

if(isset($params[2])) {
  $id = $params[2];
} elseif(isset($params[1])) {
  $id = $params[1];
}


if($method === 'GET') {
  if($q === 'trips/list') {
    getPosts($connect); 
  } 

  if($q === "trips/list/$id") {
    getPost($connect, $id, $_POST);
  }   

  if($params[0] = "product") {
    $id = $params[1];
    if($q === "product/$id") {
      getPost($connect, $id, $_POST);
    }
  }

} elseif($method === "POST") {
  if($q === 'trips/list') {
    addPost($connect, $_POST);
  }
} elseif($method === "DELETE") {
  if($q === "trips/list/$id") {
    deletePost($connect, $id);
  }
} elseif($method === "PATCH") {
  if($q === "trips/list/$id") {
      $data = file_get_contents('php://input');
      $data = json_decode($data, true);
      
      updatePost($connect, $id, $data);
  }
}

?>