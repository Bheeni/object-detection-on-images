img="";
status ="";
objects = [];

function setup(){
     canvas = createCanvas(620, 440);
     canvas.center();
     objectDetector = ml5.objectDetector('cocoossd', modelLoaded);
     document.getElementById("status").innerHTML = "Status: Detecting Objects";
 }

 function preload(){
     img = loadImage("dog_cat.jpg");
 }

 function draw(){
     image(img, 0, 0, 620, 440);
     
     if(status != ""){
        document.getElementById("status").innerHTML = "Status: Objects Detected";

         for(i = 0; i < objects.length; i++){
            fill("#FF0000");
             percent = Math.floor(objects[i].confidence *100);
             text(objects[i].label+""+percent+"%", objects[i].x +15 , objects[i].y -15 );
             noFill();
             rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
         }
     }
     
 }

 function modelLoaded(){
     console.log("model is loaded");
     status =true;
     objectDetector.detect(img, gotResult);
 }

 function gotResult (error, results){
     if(error){
         console.log(error);
     }
     console.log(results);
     objects = results;
 }