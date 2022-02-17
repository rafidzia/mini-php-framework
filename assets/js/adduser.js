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