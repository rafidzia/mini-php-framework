        document.getElementById("input-track").onkeypress = function(e){return (e.charCode > 47 && e.charCode < 58)}
        var modalF = document.getElementById("modal-frame");
        var closeB = document.getElementById("close-button");
        closeB.onclick = function(e){
            modalF.style.display = "none";
        }
        document.getElementById("form-track").onsubmit = function(e){
            e.preventDefault();
        }
        document.getElementsByTagName("button")[0].onclick = function(e){
            sendAjax("POST", "/", true, false, JSON.stringify({tracknum : document.getElementById("input-track").value}), function(data){
                data = JSON.parse(data);
                addData(data);
            });
        }
        function addData(data){
            if(data.length > 0){
                var resultString;
                for(var i = 0; i < data.length; i++){
                    resultString = '<table class="modal-content"><tr><td>TRACKING NUMBER</td><td> : </td><td>'+ data[i].id +'</td></tr>'+
                                '<tr><td>DESTINATION</td><td> : </td><td>'+ data[i].destination +'</td></tr>'+
                                '<tr><td>LOCATION</td><td> : </td><td>'+ data[i].location +'</td></tr>'+
                                '<tr><td>ADDRESS</td><td> : </td><td>'+ data[i].address +'</td></tr>'+
                                '<tr><td>LAST UPDATE</td><td> : </td><td>'+ data[i].updated_at +'</td></tr>'+
                                '</table>';
                    document.getElementById("modal-window").innerHTML = resultString;  
                }
            }else{
                var temp = document.getElementById("error-template");
                var clon = temp.content.cloneNode(true);
                document.getElementById("modal-window").innerHTML = "";
                document.getElementById("modal-window").appendChild(clon);
            }
            modalF.style.display = "";
            
        }