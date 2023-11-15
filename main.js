status1= ""
objects=[]
function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    Object_Detector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML= "Status: detecting objects";

}

function modelLoaded(){
    console.log(" Model Loaded");
    status1= true;

}

function gotResults(error,results){
    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        objects=results;``
    }
}
function preload(){
    img= loadImage("dog_cat.jpg");

}

function draw(){
    r=random(255);
    g=random(255);
    b=random(255);
    image(video,0,0,380,380);
    if(status1!=""){
        Object_Detector.detect(video, gotResults);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects detected";
            object_name=document.getElementById("object_name").value;
           if(object_name==objects[i].label){
            document.getElementById("object_status").innerHTML= "object found";
           }
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x+30 , objects[i].y+30);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}