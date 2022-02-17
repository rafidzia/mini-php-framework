sendAjax("GET", "/admin/baselocation", false, false, false, function(data){
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
document.getElementById("close-button-1").onclick = function(e){
    document.getElementById("modal-frame").style.display = "none";
}


function setData(data){
    var str = '<tr><th>TN</th><th>STATUS</th><th>LAST UPDATE</th><th class="edit-el" style="display: none;">UPDATE</th><th class="edit-el" style="display: none;">DELETE</th></tr>';
    for(var i = 0; i < data.length; i++){
        str += '<tr><td>'+ data[i].id +'</td>'+
            '<td>'+ data[i].status +'</td>'+
            '<td>'+ data[i].updated_at +'</td>'+
            '<td class="edit-el" style="display: none;"><a href="/admin/update/'+ data[i].id +'" class="asd4" onclick="alink(event, `update`);return false;">&#9998;</a></td>'+
            '<td class="edit-el" style="display: none;"><a href="/admin/delete/'+ data[i].id +'" class="asd4" onclick="alink(event, `delete`);return false;">&#10006;</a></td>'+
            '</tr>';
    }
    document.getElementById("table").innerHTML = str;
    document.getElementById("count-display").innerText = data.length;
}
function refresh(){
    sendAjax("POST", "/admin/", false, false, false, function(data){
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
    if(search.value == ""){
        refresh();
        return;
    }
    sendAjax("POST", "/admin/search/"+ search.value, false, false, false, function(data){
        data = JSON.parse(data);
        setData(data);
    })
}