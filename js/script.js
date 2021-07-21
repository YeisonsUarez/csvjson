
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
function converrToCsv(json, sep) {
    json = json.replace("[", "").replace(/{/g, "").replace(/]/g, "");
    var separadorCsv = sep;
    var items = json.split("}");
    headers = {};
    var body = "";
    for (var i = 0; i < items.length; i++) {
        var itemsj = items[i].split(",");
        itemsj = itemsj.filter(function (e) { return e });
        for (var j = 0; j <= itemsj.length; j++) {
            if (itemsj[j] != undefined) {
                var subItems = itemsj[j].split(":");
                headers[subItems[0].trim()] = 0;
                if (j < itemsj.length - 1) {
                    body = body + subItems[1] + separadorCsv;
                } else {
                    body = body + subItems[1];
                }


            }
        }
        body = body + "\n";


    }
    var head = Object.keys(headers).join(separadorCsv);
    var lastCharacter = head.charAt(head.length - 1);
    if (lastCharacter == separadorCsv) {
        head = head.slice(0, head.length - 1);
    }
    body = head + "\n" + body;
    return body.replace(/undefined/g, "");

}
/*var json= '[{"Id":1,"UserName":"Sam Smith"} , {"Id":2,"UserName":"Fred Frankly"} , {"Id":1,"UserName":"Zachary Zupers"}]';

console.log(converrToCsv(json,"|"));



var json = '"Id","UserName","Cedula"-"1","Sam Smith",123-"2","Fred Frankly",4567-"1","Zachary Zupers",789-"1","Sam Smith",98-"2","Fred Frankly",433-"1","Zachary Zupers",11212';

console.log(convertToJson(json, "-", ","));

*/
const textarea = document.querySelector("textarea");
textarea.addEventListener("keyup", e => {
    let scHeight = e.target.scrollHeight;
    textarea.style.height = "auto";
    textarea.style.height = `${scHeight}px`;
});
/*Drop Area*/
//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = () => {
    input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function () {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); //calling function
});

function showFile(event) {
    let fileType = file.type; //getting selected file type
    let validExtensions = ["application/json", "application/vnd.ms-excel"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) { //if user selected file is an image file

        let reader = new FileReader(); //creating new FileReader object
        var printEventType = function (event) {
            switch(event.type){
                case "loadstart":
                    textData.placeholder = "📤 We are uploading your file progress. Progress  40% ";
                    break;
                case "progress":
                    textData.placeholder = "📤 Wait, we will finish reading your file in a moment.... Progress  60% ";
                    break;
                case "loadend":
                    textData.placeholder = "📤 Wait, we will finish reading your file in a moment........ Progress  80% ";
                    break;

            }
            console.log('got event: ' + event.type);
        };

        reader.onloadstart = printEventType;
        reader.onprogress = printEventType;
        

        reader.onload = function () {
            var text = reader.result;
            textData.innerHTML = reader.result;
            console.log(reader.result.substring(0, 200));
        };
        reader.onloadend = printEventType;
        reader.readAsText(file);


    } else {
        alert("This is not an CSv or JSON File");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}
var openFile = function (event) {
    var input = event.target;
    var reader = new FileReader();
    var printEventType = function (event) {
        switch(event.type){
            case "loadstart":
                textData.placeholder = "📤 We are uploading your file progress. Progress  40% ";
                break;
            case "progress":
                textData.placeholder = "📤 Wait, we will finish reading your file in a moment.... Progress  60% ";
                break;
            case "loadend":
                textData.placeholder = "📤 Wait, we will finish reading your file in a moment........ Progress  80% ";
                break;

        }
        console.log('got event: ' + event.type);
    };
    
    reader.onloadstart = printEventType;
    reader.onprogress = printEventType;
    
    reader.onload = function () {
        var text = reader.result;
        textData.innerHTML = reader.result;
        console.log(reader.result.substring(0, 200));
    };
    reader.onloadend = printEventType;
    reader.readAsText(input.files[0]);
};

