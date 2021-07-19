
function convertToJson(text, sep, sep2) {
    var arrayJson = text.split(sep);
    var result = "[";
    const headers = arrayJson[0].split(sep2);
    //console.log(headers);
    for (var i = 1; i < arrayJson.length; i++) {
        result = result + "{";
        var items = arrayJson[i].split(sep2);
        //console.log(items);
        for (var j = 0; j < items.length; j++) {
            if (j == items.length - 1) {
                result = result + `${headers[j]}:${items[j]}`;

            } else {
                result = result + `${headers[j]}:${items[j]},`;

            }
        }
        if (i == arrayJson.length - 1) {
            result = result + "}";

        } else {
            result = result + "},";

        }
    }
    result = result + "]";
    return result;
}
function converrToCsv(json,sep) {
    json=json.replace("[","").replace(/{/g,"").replace(/]/g,"");
    var separadorCsv= sep;
    var items= json.split("}");
    headers={};
    var body="";
    for(var i=0;i<items.length;i++){
      var itemsj= items[i].split(",");
      itemsj=itemsj.filter(function(e){ return e}); 
      for(var j=0;j<=itemsj.length;j++){
          if(itemsj[j]!= undefined){
            var subItems= itemsj[j].split(":");
            headers[subItems[0].trim()]=0;
            if(j<itemsj.length-1){
               body= body+subItems[1]+separadorCsv;
            }else{
               body= body+subItems[1];
            }
            
           
          }
      }
      body=body+"\n";
      
    
    }
    var head= Object.keys(headers).join(separadorCsv);
    var lastCharacter= head.charAt(head.length-1);
    if(lastCharacter==separadorCsv){
      head= head.slice(0,head.length-1);
    }
    body=head+"\n"+body;
    return body.replace(/undefined/g,"");
    
}
/*var json= '[{"Id":1,"UserName":"Sam Smith"} , {"Id":2,"UserName":"Fred Frankly"} , {"Id":1,"UserName":"Zachary Zupers"}]';

console.log(converrToCsv(json,"|"));



var json = '"Id","UserName","Cedula"-"1","Sam Smith",123-"2","Fred Frankly",4567-"1","Zachary Zupers",789-"1","Sam Smith",98-"2","Fred Frankly",433-"1","Zachary Zupers",11212';

console.log(convertToJson(json, "-", ","));

*/
const textarea= document.querySelector("textarea");
textarea.addEventListener("keyup", e=>{
    let scHeight = e.target.scrollHeight;
    textarea.style.height= "auto";
    textarea.style.height= `${scHeight}px`;
});