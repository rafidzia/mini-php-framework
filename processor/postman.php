<?php
get("/postman", function($conn, $param){
    $datauser = auth("postman");
    echo serveView("postman");
});

post("/postman", function($conn, $param){
    $datauser = auth("postman");
    $location = $datauser['location'];
    $result = $conn->query("SELECT * from storage where location = '".$location."' and destination = '".$location."' and status = 'unreceived'order by updated_at");
    $output = sqltoarray($result);
    echo json_encode($output);
});

post("/postman/search/:key", function($conn, $param){
    $datauser = auth("postman");
    $location = $datauser['location'];
    $key = filterstr($param["key"]);
    $result = $conn->query("SELECT * from storage where id = '".$key."' and location = '".$location."' and destination = '".$location."' and status = 'unreceived' order by updated_at");
    echo json_encode(sqltoarray($result));
});

get("/postman/received/:key", function($conn, $param, $data){
    $datauser = auth("postman");
    $key = filterstr($param["key"]);
    $location = $datauser['location'];
    $result = $conn->query("UPDATE storage  set status = 'received' where id = '".$key."' and location = '".$location."' and destination = '".$location."' and status = 'unreceived'");
    echo json_encode("{}");
});

get("/postman/baselocation", function(){
    $datauser = auth("postman");
    $location = $datauser['location'];
    echo json_encode(array("location" => $location));
})
?>