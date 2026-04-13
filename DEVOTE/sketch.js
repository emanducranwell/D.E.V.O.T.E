// let capture;
// let cam;
// let data;
// let ml;
// let currentLabel = "Waiting...";
// let dataLabel;

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
// }


// function draw() {
//   background(255);
//   console.log(currentLabel);

//   // Display the video feed
//   // if ml bridge retuns "paying attention", hide camera/ stop displaying then show the text Good work keep it up!! 
//   // if ml bridge retuns "not looking" then show the text pay attention and begin recording!! 
//   // create a 3 strikes and your out system that resets every hour

//   // text(currentLabel, width/2, height/2);

//   if (dataLabel === ("NOATTENTION")) {
//       cam = image(capture, 0, 0, width, height);
//       background(255,0,0,100);
//       fill(0);
//       textStyle(BOLD);
//       textSize(40);
//       textAlign(CENTER);
//       text("PAY ATTENTION ",(width/2), height*0.6);
//       textSize(20);
//       textStyle(NORMAL);
//       textStyle(ITALIC);
//       text("FlexCheck is always watching! ",(width/2), height*0.7);
      

//   } else if (dataLabel === ("ATTENTION")) {

//       cam = image(capture, 0, 0, width, height);
//       background(0,255,0,0);
//       fill(0);
//       textStyle(BOLD);
//       textSize(40);
//       textAlign(CENTER);
//       text("Good work keep it up!!",(width/2), height*0.6);
//       textSize(20);
//       textStyle(NORMAL);
//       textStyle(ITALIC);
//       text("FlexCheck is always watching! ",(width/2), height*0.7);
//   };

//   // fill(255,0,0);
//   // textStyle(BOLD);
//   // textSize(40);
//   // text("RECORDING",(width/2)-150, height*0.25);
//   // textSize(20);
//   // text("User Not Paying attention!!",(width/2)-80, height*0.75);

//   // fill(0);
//   // textStyle(BOLD);
//   // textSize(40);
//   // text("NOT RECORDING",(width/2)-150, height*0.25);
//   // textSize(20);
//   // text("User Paying Attention",(width/2)-80, height*0.75);
// }