<?php
get("/", function($conn, $param){
    echo serveView("customer");
});
post("/", function($conn, $param, $data){
    $tracknum = filterstr($data->tracknum);
    $result = $conn->query("SELECT * from storage where id = '".$tracknum."' and status = 'unreceived'");
    $output = sqltoarray($result);
    echo json_encode($output);
})

?>