var sendAjax = function(type, url, cache, header, data, success){
    var xhr = new XMLHttpRequest();
    if(cache){
      xhr.open(type, url + ((/\?/).test(url) ? "&" : "?") + (new Date().getTime()));
    }else{
      xhr.open(type, url);
    }
    if(header){
      for(var i = 0; i < header.length; i++){
          xhr.setRequestHeader(header[i][0], header[i][1]);
      }
    }
    if(data){
        xhr.send(data)
    }else{
        xhr.send();
    }
    xhr.onreadystatechange = function(){
        if((this.status == 200) && (this.readyState == 4)){
            success(this.response);
        }
    }
}