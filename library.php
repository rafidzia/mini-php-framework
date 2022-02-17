<?php
function sqltoarray($result){
    $output = [];
    while($o = $result->fetch_assoc()){
        $output[] = $o;
    }
    return $output;
}

function filterstr($str){
    return filter_var($str, FILTER_SANITIZE_STRING);
}
function redirect($path){
    global $maindir;
    echo "<script type='text/javascript'>window.location.replace('".$maindir.$path."')</script>";
}
function alert($msg){
    echo '<script type="text/javascript">alert("' . $msg . '")</script>';
}

function auth($role){
    global $conn;
    if(isset($_SERVER["PHP_AUTH_USER"])){
        $username = filterstr($_SERVER['PHP_AUTH_USER']);
        $password = filterstr($_SERVER['PHP_AUTH_PW']);
    }else{
        $username = "";
        $password = "";
    }
    
    $password = hash('sha256', $password);
    $validated = false;
    if(strlen($username) > 0 && strlen($password) > 0){
        $query = "SELECT * from users where  username = '".$username."' and password = '".$password."'";
        $result = $conn->query($query);
        if($result->num_rows > 0){
            $result = $result->fetch_assoc();
            if($result["role"] == $role){
                $validated = true;
                return $result;
            }
        }
    }
    if(!$validated) {
        header('WWW-Authenticate: Basic realm="My Realm"');
        header('HTTP/1.0 401 Unauthorized');
        echo file_get_contents("./views/401.html");
        exit;
        die();
    }
}

function serveView($view){
    global $localhostpath;
    $temphtml = file_get_contents("./views/" . $view . ".html");
    $temphtml = str_replace("/assets", $localhostpath."/assets", $temphtml);
    echo $temphtml;
}

?>