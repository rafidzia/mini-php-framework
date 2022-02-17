<?php
get("/asd", function(){
    echo serveView("adduser");
});
post("/asd", function($conn, $param){
    $username = filterstr($_POST['username']);
    $password = filterstr($_POST['password']);
    $role = filterstr($_POST['role']);
    $location = filterstr($_POST['kota']);
    $password = hash('sha256', $password);
    if($conn->query("INSERT INTO users (username, password, role, location) values ('".$username."', '".$password."', '".$role."', '".$location."')")){
        alert("Success to create");
        redirect("/");
    }else{
        
        alert("Failed to create : ".$conn->error);
    }
});
get("/provinsi", function($conn, $param){
    $url = "https://dev.farizdotid.com/api/daerahindonesia/provinsi";
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
    ]);
    $response = curl_exec($curl);
    curl_close($curl);
    echo $response;
});

get("/kota/:id", function($conn, $param){
    $url = "https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=".$param["id"];
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
    ]);
    $response = curl_exec($curl);
    curl_close($curl);
    echo $response;
})
?>