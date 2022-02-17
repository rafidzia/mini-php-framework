<?php
require_once("./connection.php");
require_once("./config.php");
require_once("./library.php");
$maindir = "";



$processkey = [];
$processfunc = [];
$dataparam = [];
$data;
function check(string $path){
    global $dataparam;
    global $localhostpath;
    $url = $_SERVER['REQUEST_URI'];
    $url = strrev(substr(strrev($url),0, strpos(strrev($url), strrev($localhostpath))));

    $url = explode("?", $url);
    if(count($url) > 1){
        $url = array_shift($url);
    }else{
        $url = $url[0];
    }

    $url = explode("/", $url);
    $path = explode("/", $path);
    for($i = 0; $i < count($url); $i++){
        if($url[count($url) - 1] == ""){
            array_pop($url);
        }
    }
    for($i = 0; $i < count($path); $i++){
        if($path[count($path) - 1] == ""){
            array_pop($path);
        }
    }

    if(count($url) !== count($path)){
        return false;
    }
    
    for($i = 0; $i < count($path); $i++){
        if(substr($path[$i], 0, 1) == ":"){
            if($url[$i] == ""){
                return false;
            }
            $datakey = substr($path[$i], 1);
            $dataparam[$datakey] = $url[$i];
        }else{
            if($path[$i] != $url[$i]){
                return false;
                break;
            }
        }
    }
    return true;
}




$routecount = 0;
function get(string $path, object $callback){
    if($_SERVER["REQUEST_METHOD"] !== "GET") return;
    global $processkey, $processfunc, $routecount, $maindir, $data;
    $processkey[$routecount] = $maindir . $path;
    $processfunc[$routecount] = $callback;
    $routecount++;
};
function post(string $path, object $callback){
    if($_SERVER["REQUEST_METHOD"] !== "POST") return;
    global $processkey, $processfunc, $routecount, $maindir, $data;
    $processkey[$routecount] = $maindir . $path;
    $processfunc[$routecount] = $callback;
    $routecount++;
    $data = json_decode(file_get_contents('php://input'));
};

$processdir = "processor/";
if(is_dir($processdir)){
    if ($dh = opendir($processdir)){
        while (($file = readdir($dh)) !== false){
            if($file == "." || $file == "..") continue;
            require_once($processdir . $file);
        }
        closedir($dh);
    }
}

for($i = 0; $i < count($processkey); $i++){
    if(check($processkey[$i])){
        $processfunc[$i]($conn, $dataparam, $data);
        break;
    }
    if($i == count($processkey) - 1){
        http_response_code(404);
        echo file_get_contents("./views/404.html");
    }
}


?>