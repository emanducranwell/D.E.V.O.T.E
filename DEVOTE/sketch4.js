// let capture;
// let cam;
// let data;
// let ml;
// let currentLabel = "Waiting...";
// let dataLabel;
// let attScore = 0;

// function setup() {
//   createCanvas(640, 480);

//   ml = new MLBridge(); // Auto-connects
  
//   ml.onPrediction((data) => {
//     if (data.label) {
//       currentLabel = data.label + " (" + int(data.confidence * 100) + "%)";
//       dataLabel = data.label;
//       dataConfidence = int(data.confidence);

//     } else if (data.regression) {
//       // Handle Regression
//       currentLabel = "";
//       for (let key in data.regression) {
//         currentLabel += key + ": " + nf(data.regression[key], 1, 2) + "\n";
//       }
//     }
//   });

//   // Initialize webcam, default constraints
//   capture = createCapture(VIDEO);
//   // Hide the HTML element, only show canvas
//   capture.hide();

//   attentionCounterOutline();
// }

// function draw() {
//   // Always display the webcam first
//   image(capture, 0, 0, width, height);
  
//   console.log("attScore: " + attScore);
//   console.log("currentLabel: " + currentLabel);
//   console.log("dataLabel: " + dataLabel);

//   if (dataLabel == "NOATTENTION") {
//       // Red overlay on top of webcam
//       fill(255,0,0,80);
//       rect(0,0,width,height);
//       fill(0);
//       textStyle(BOLD);
//       textSize(40);
//       textAlign(CENTER);
//       text("PAY ATTENTION ",(width/2), height*0.6);
//       textSize(20);
//       textStyle(NORMAL);
//       textStyle(ITALIC);
//       text("FlexCheck is always watching! ",(width/2), height*0.7);

//   } else if(dataLabel == "ATTENTION") {
//       // Green overlay on top of webcam - darker so you can see through it
//       fill(0,200,0,120);
//       rect(0,0,width,height);
      
//       fill(0);
//       textStyle(BOLD);
//       textSize(40);
//       textAlign(CENTER);
//       text("Good work keep it up!!",(width/2), height*0.6);
//       textSize(20);
//       textStyle(NORMAL);
//       textStyle(ITALIC);
//       text("FlexCheck is always watching! ",(width/2), height*0.7);
//   } else {
//       // Default state while waiting for ML data
//       fill(200);
//       textSize(20);
//       textAlign(CENTER);
//       text("Waiting for model...", width/2, height/2);
//   }

//   attentionCounter();
// }

// function attentionCounter(){
//     if (dataLabel == "NOATTENTION") {
//         attScore = attScore + 1;
//         if (attScore > 10) attScore = 10;
//     } else if (dataLabel == "ATTENTION") {
//         attScore = attScore - 1;
//         if (attScore < 0) attScore = 0;
//     }

//     // Draw circles based on current attScore
//     for (let i = 0; i < attScore; i++) {
//         noStroke();
//         fill(0,0,255);
//         circle(width/4 + (i*50), height/8, 20);
//     }
// }

// function attentionCounterOutline(){
//     for (i = 0; i < 10; i++) {
//         strokeWeight(1);
//         noFill();
//         circle(width/4 + (i*50), height/8, 20);
//     }
// }

// function terminated(){

//     fill(0,200,0,120);
//     rect(0,0,width,height);
    
//     fill(0);
//     textStyle(BOLD);
//     textSize(40);
//     textAlign(CENTER);
//     text("EMPLOYEE TERMINATION",(width/2), height*0.6);
//     textSize(20);
//     textStyle(NORMAL);
//     textStyle(ITALIC);
//     text(" Reason: Lack of Focus ",(width/2), height*0.7);
    
    
// }
