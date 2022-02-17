sendAjax("GET", "/postman/baselocation", false, false, false, function(data){
    data = JSON.parse(data);
    document.getElementById("base-location").innerText = "Your Base Location : " + data.location;
})
var blackCover = document.getElementById("black-cover");
var menuBar = document.getElementById("menu-bar");
var modalF = document.getElementById("modal-frame")
document.getElementById("menu-button").onclick = function(e){
    menuBar.style.left = "0px";
    blackCover.style.display = "block";
}
document.getElementById("close-button-2").onclick = function(e){
    menuBar.style.left = "-300px";
    blackCover.style.display = "none";
}
var editbutton = document.getElementById("edit-button");
editbutton.onclick = function(e){
    var display = "";
    var caption = "";
    if(editbutton.innerText == "EDIT"){
        caption = "DONE";
    }else if(editbutton.innerText == "DONE"){
        display = "none";
        caption = "EDIT";
    }
    var editel = document.getElementsByClassName("edit-el");
    for(var i = 0; i < editel.length; i++){
        editel[i].style.display = display;
    }
    editbutton.innerHTML = caption;
}

function alink(e, type){
    if(type == "accept"){
        if(!confirm("are you sure to accept")){
            return;
        }
    }   
    sendAjax("GET", e.target.href, false, false, false, function(data){                
        refresh();
        editbutton.innerHTML = "EDIT";
    })
}

function setData(data){
    var str = '<tr><th>TN</th><th>DESTINATION</th><th>LOCATION</th><th>ADDRESS</th><th>LAST UPDATE</th><th class="edit-el" style="display: none;">RECEIVED</th></tr>';
    for(var i = 0; i < data.length; i++){
        str += '<tr><td>'+ data[i].id +'</td>'+
            '<td>'+ data[i].destination +'</td>'+
            '<td>'+ data[i].location +'</td>'+
            '<td>'+ data[i].address +'</td>'+
            '<td>'+ data[i].updated_at +'</td>'+
            '<td class="edit-el" style="display: none;"><a href="/postman/received/'+ data[i].id +'" class="asd4" onclick="alink(event, `accept`);return false;">&#10004;</a></td>'+
            '</tr>';
    }
    document.getElementById("table").innerHTML = str;
    document.getElementById("count-display").innerText = data.length;
}
function refresh(){
    sendAjax("POST", "/postman", false, false, false, function(data){
        data = JSON.parse(data);
        setData(data);
    })
}
refresh();

var search = document.getElementById("search");
search.onkeypress = function(e){
    return (e.charCode > 47 && e.charCode < 58)
}
search.onkeyup = function(e){
    editbutton.innerHTML = "EDIT";
    if(search.value == ""){
        refresh();
        return;
    }
    sendAjax("POST", "/postman/search/"+ search.value, false, false, false, function(data){
        data = JSON.parse(data);
        setData(data);
    })
}