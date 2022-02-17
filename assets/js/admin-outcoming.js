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

var modalform = document.getElementById("modal-form");
document.getElementById("add-button").onclick = function(e){
    var str = '<form id="form-input" action="/admin/outcoming/create" method="post">'+
    'DESTINATION<select class="asd2" style="font-size: 15px;margin: 10px 0px;width:100%;" placeholder="DESTINATION" id="provinsi"></select>'+
    'DESTINATION<select class="asd2" style="font-size: 15px;margin: 10px 0px;width:100%;" placeholder="DESTINATION" id="kota"></select>'+
    'ADDRESS<input type="text" class="asd2" style="font-size: 15px;margin: 10px 0px;width:100%;" placeholder="ADDRESS" id="address"><br/>' +
    '<div style="text-align: right;"><button class="asd3" style="font-size: 15px;margin: 10px 0px">SUBMIT</button></div></form>';
    modalform.innerHTML = str;
    modalF.style.display = "";
    findPlace();
    var forminput = document.getElementById("form-input")
        forminput.onsubmit = function(e){
        e.preventDefault();
        sendAjax("POST", forminput.action, false, false, JSON.stringify({destination : document.getElementById("kota").value, address : document.getElementById("address").value}), function(data){
            modalF.style.display = "none";
            refresh();
        })
    }
}


function findPlace(){
    var selectProvinsi = document.getElementById("provinsi");
            var selectKota = document.getElementById("kota");

            sendAjax("GET", "/provinsi", false, false, false, function(data){
                data = JSON.parse(data);
                data = data.provinsi;
                var str = ""
                for(var i = 0; i < data.length; i++){
                    str += '<option value="'+ data[i].id +'">'+ data[i].nama +'</option>';
                }
                selectProvinsi.innerHTML = str;
            })
            selectProvinsi.onchange = function(e){
            sendAjax("GET", "/kota/" + selectProvinsi.value, false, false, false, function(data){
                data = JSON.parse(data);
                data = data.kota_kabupaten;
                var str = ""
                for(var i = 0; i < data.length; i++){
                    str += '<option value="'+ data[i].nama +'">'+ data[i].nama +'</option>';
                }   
                selectKota.innerHTML = str;
            })
        }
}
function alink(e, type){
    if(type == "delete"){
        if(!confirm("are you sure to delete")){
            return;
        }
    }   
    sendAjax("GET", e.target.href, false, false, false, function(data){                
        if(type == "update"){
            data = JSON.parse(data)[0];
            var str = '<form id="form-input" action="/admin/outcoming/update/'+ data.id +'" method="post">'+
            'DESTINATION<select class="asd2" style="font-size: 15px;margin: 10px 0px;width:100%;" placeholder="DESTINATION" id="provinsi"></select>'+
            'DESTINATION<select class="asd2" style="font-size: 15px;margin: 10px 0px;width:100%;" placeholder="DESTINATION" id="kota"value="'+  data.destination +'"></select>'+
            'ADDRESS<input type="text" class="asd2" style="font-size: 15px;margin: 10px 0px;width:100%;" placeholder="ADDRESS" value="'+  data.address +'" id="address"><br/>' +
            '<div style="text-align: right;"><button class="asd3" style="font-size: 15px;margin: 10px 0px">SUBMIT</button></div></form>';
            modalform.innerHTML = str;
            modalF.style.display = "";
            findPlace();
            var forminput = document.getElementById("form-input")
            forminput.onsubmit = function(e){
                e.preventDefault();
                sendAjax("POST", forminput.action, false, false, JSON.stringify({destination : document.getElementById("kota").value, address : document.getElementById("address").value}), function(data){
                    modalF.style.display = "none";
                    refresh();
                    editbutton.innerHTML = "EDIT";
                })
            }  
        }else{
            refresh();
            editbutton.innerHTML = "EDIT";
        }
    })
}

function setData(data){
    var str = '<tr><th>TN</th><th>DESTINATION</th><th>LOCATION</th><th>ADDRESS</th><th>LAST UPDATE</th><th class="edit-el" style="display: none;">UPDATE</th><th class="edit-el" style="display: none;">DELETE</th></tr>';
    for(var i = 0; i < data.length; i++){
        str += '<tr><td>'+ data[i].id +'</td>'+
            '<td>'+ data[i].destination +'</td>'+
            '<td>'+ data[i].location +'</td>'+
            '<td>'+ data[i].address +'</td>'+
            '<td>'+ data[i].updated_at +'</td>'+
            '<td class="edit-el" style="display: none;"><a href="/admin/outcoming/update/'+ data[i].id +'" class="asd4" onclick="alink(event, `update`);return false;">&#9998;</a></td>'+
            '<td class="edit-el" style="display: none;"><a href="/admin/outcoming/delete/'+ data[i].id +'" class="asd4" onclick="alink(event, `delete`);return false;">&#10006;</a></td>'+
            '</tr>';
    }
    document.getElementById("table").innerHTML = str;
    document.getElementById("count-display").innerText = data.length;
}
function refresh(){
    sendAjax("POST", "/admin/outcoming", false, false, false, function(data){
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
    sendAjax("POST", "/admin/outcoming/search/"+ search.value, false, false, false, function(data){
        data = JSON.parse(data);
        setData(data);
    })
}