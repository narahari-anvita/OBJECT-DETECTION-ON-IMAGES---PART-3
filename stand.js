img=""
status = "";
objects=[];

function preload(){
    img = loadImage ('stand.jpg');
}

function setup(){
    canvas = createCanvas(330,300);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw(){
    image(img,0,0,330,300);

    if(status != ""){
      for(i=0;  i < objects.length; i++){
          document.getElementById("status").innerHTML = "Status : Object Detected";

          fill("#FF0000");
          percent=floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }  
    }


}

function back_stand(){
    window.location = "index.html";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,results) {
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}