<?php
get("/admin/", function($conn, $param){
    auth("admin");
    echo serveView("admin-storage");
});
post("/admin/", function($conn, $param){
    $datauser = auth("admin");
    $location = $datauser['location'];
    $result = $conn->query("SELECT * from storage where location = '".$location."' and destination = '".$location."' order by updated_at");
    $output = sqltoarray($result);
    echo json_encode($output);
});

post("/admin/search/:key", function($conn, $param){
    $datauser = auth("admin");
    $location = $datauser['location'];
    $key = filterstr($param["key"]);
    $result = $conn->query("SELECT * from storage where id = '".$key."' and location = '".$location."' and destination = '".$location."' order by updated_at");
    echo json_encode(sqltoarray($result));
});



get("/admin/outcoming", function($conn, $param){
    auth("admin");
    echo serveView("admin-outcoming");
});

post("/admin/outcoming", function($conn, $param){
    $datauser = auth("admin");
    $location = $datauser['location'];
    $result = $conn->query("SELECT * from storage where location = '".$location."' and destination != '".$location."' order by updated_at");
    $output = sqltoarray($result);
    echo json_encode($output);
});

post("/admin/outcoming/create", function($conn, $param, $data){
    $datauser = auth("admin");
    $destination = filterstr($data->destination);
    $address = filterstr($data->address);
    $location = $datauser['location'];
    $result = $conn->query("INSERT into storage (destination, location, address, status) values ('".$destination."', '".$location."', '".$address."', 'unreceived')");
    echo json_encode("{}");
})
;
get("/admin/outcoming/update/:key", function($conn, $param){
    $datauser = auth("admin");
    $location = $datauser['location'];
    $key = filterstr($param["key"]);
    $result = $conn->query("SELECT * from storage where id = '".$key."' and location = '".$location."' and destination != '".$location."' order by updated_at");
    echo json_encode(sqltoarray($result));
});

post("/admin/outcoming/update/:key", function($conn, $param, $data){
    $datauser = auth("admin");
    $key = filterstr($param["key"]);
    $destination = filterstr($data->destination);
    $address = filterstr($data->address);
    $location = $datauser['location'];
    $result = $conn->query("UPDATE storage  set destination = '".$destination."', address = '".$address."' where id = ".$key." and location = '".$location."'");
    echo json_encode("{}");
});

get("/admin/outcoming/delete/:key", function($conn, $param, $data){
    $datauser = auth("admin");
    $key = filterstr($param["key"]);
    $location = $datauser['location'];
    $result = $conn->query("DELETE from storage where id = ".$key." and location = '".$location."'");
    echo json_encode("{}");
});

post("/admin/outcoming/search/:key", function($conn, $param, $data){
    $datauser = auth("admin");
    $location = $datauser['location'];
    $key = filterstr($param["key"]);
    $result = $conn->query("SELECT * from storage where id = '".$key."' and location = '".$location."' and destination != '".$location."' order by updated_at");
    echo json_encode(sqltoarray($result));
});

get("/admin/incoming", function($conn, $param){
    $datauser = auth("admin");
    echo serveView("admin-incoming");
});

post("/admin/incoming", function($conn, $param){
    $datauser = auth("admin");
    $location = $datauser['location'];
    $result = $conn->query("SELECT * from storage where location != '".$location."' and destination = '".$location."' order by updated_at");
    $output = sqltoarray($result);
    echo json_encode($output);
});

post("/admin/incoming/search/:key", function($conn, $param, $data){
    $datauser = auth("admin");
    $location = $datauser['location'];
    $key = filterstr($param["key"]);
    $result = $conn->query("SELECT * from storage where id = '".$key."' and location != '".$location."' and destination = '".$location."' order by updated_at");
    echo json_encode(sqltoarray($result));
});

get("/admin/incoming/accept/:key", function($conn, $param, $data){
    $datauser = auth("admin");
    $key = filterstr($param["key"]);
    $location = $datauser['location'];
    $result = $conn->query("UPDATE storage  set location = '".$location."' where id = ".$key." and destination = '".$location."'");
    echo json_encode("{}");
});

get("/admin/baselocation", function(){
    $datauser = auth("admin");
    $location = $datauser['location'];
    echo json_encode(array("location" => $location));
})

?>