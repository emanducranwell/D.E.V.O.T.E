let capture;
let cam;
let data;
let ml;
let currentLabel = "Waiting...";
let dataLabel;

let attScore = 0;
let warningCount = 0;
let isShowingWarning = false;
let warningDisplayTime = 0;
const WARNING_DISPLAY_DURATION = 120; // frames to show warning (about 2 seconds at 60fps)

let consecutiveCount = 0;
let lastLabel = null;
const THRESHOLD = 3;

let warnConsecutiveCount = 0;
let lastWarning = null;
const WARNTHRESHOLD = 3;

function setup() {
  createCanvas(640, 480);

  ml = new MLBridge(); // Auto-connects
  
  ml.onPrediction((data) => {
    if (data.label) {
      currentLabel = data.label + " (" + int(data.confidence * 100) + "%)";
      dataLabel = data.label;
      dataConfidence = int(data.confidence);
      
      // Track consecutive predictions
      if (dataLabel === lastLabel) {
        consecutiveCount++;
      } else {
        consecutiveCount = 1;
        lastLabel = dataLabel;
      }
      
      console.log("Label: " + dataLabel + ", Consecutive: " + consecutiveCount);

    } else if (data.regression) {
      // Handle Regression
      currentLabel = "";
      for (let key in data.regression) {
        currentLabel += key + ": " + nf(data.regression[key], 1, 2) + "\n";
      }
    }
  });
  // Initialize webcam, default constraints
  capture = createCapture(VIDEO);
  // Hide the HTML element, only show canvas
  capture.hide();
}

function draw() {
  // Always display the webcam first
  image(capture, 0, 0, width, height);
  
  console.log("attScore: " + attScore);
  console.log("currentLabel: " + currentLabel);
  console.log("dataLabel: " + dataLabel);
  console.log("warningCount: " + warningCount);

  // Check if we're currently showing a warning
  if (isShowingWarning) {
    warning();
    warningDisplayTime++;
    
    // After warning display time, reset and go back to normal
    if (warningDisplayTime >= WARNING_DISPLAY_DURATION) {
      isShowingWarning = false;
      warningDisplayTime = 0;
      attScore = 0; // Reset attScore so it starts counting again
    }
  } else {
    // Normal gameplay
    if (dataLabel == "NOATTENTION") {
        // Red overlay on top of webcam
        fill(255,0,0,80);
        rect(0,0,width,height);
        fill(0);
        textStyle(BOLD);
        textSize(40);
        textAlign(CENTER);
        text("PAY ATTENTION ",(width/2), height*0.6);
        textSize(20);
        textStyle(NORMAL);
        textStyle(ITALIC);
        text("FlexCheck is always watching! ",(width/2), height*0.7);

    } else if(dataLabel == "ATTENTION") {
        // Green overlay on top of webcam - darker so you can see through it
        fill(0,200,0,120);
        rect(0,0,width,height);
        
        fill(0);
        textStyle(BOLD);
        textSize(40);
        textAlign(CENTER);
        text("Good work keep it up!!",(width/2), height*0.6);
        textSize(20);
        textStyle(NORMAL);
        textStyle(ITALIC);
        text("FlexCheck is always watching! ",(width/2), height*0.7);
    } else {
        // Default state while waiting for ML data
        fill(200);
        textSize(20);
        textAlign(CENTER);
        text("Waiting for model...", width/2, height/2);
    }

    // Draw outline AFTER overlays so it appears on top
    attentionCounterOutline();
    attentionCounter();
  }
}

function attentionCounter(){
    // Only update attScore when we reach the threshold of consecutive predictions
    if (consecutiveCount >= THRESHOLD) {
        if (dataLabel == "NOATTENTION") {
            attScore = attScore + 1;
            if (attScore > 10) attScore = 10;
        } else if (dataLabel == "ATTENTION") {
            attScore = attScore - 1;
            if (attScore < 0) attScore = 0;
        }
        // Reset counter after updating so it doesn't keep incrementing
        consecutiveCount = 0;
    }

    // Draw circles based on current attScore
    for (let i = 0; i < attScore; i++) {
        noStroke();
        fill(0,0,255);
        circle(width/6 + (i*50), height/8, 20);
    }

    // Trigger warning when attScore reaches 10
    if (attScore >= 10){
        isShowingWarning = true;
        warningCount++;
    }
}

function attentionCounterOutline(){
    for (i = 0; i < 10; i++) {
        strokeWeight(1);
        noFill();
        circle(width/6 + (i*50), height/8, 20);
    }
}

function warning(){
    fill(255,255,0,120);
    rect(0,0,width,height);
    
    fill(0);
    textStyle(BOLD);
    textSize(40);
    textAlign(CENTER);
    text("WARNING",(width/2), height*0.6);
    textSize(20);
    textStyle(NORMAL);
    textStyle(ITALIC);
    text("Warnings: " + warningCount + " / 3 = Termination",(width/2), height*0.7);

    if (warningCount >= WARNTHRESHOLD) {
        terminated();
    }
}

function terminated(){
    fill(255,255,0);
    rect(0,0,width,height);
    
    fill(0);
    textStyle(BOLD);
    textSize(40);
    textAlign(CENTER);
    text("EMPLOYEE TERMINATION",(width/2), height*0.6);
    textSize(20);
    textStyle(NORMAL);
    textStyle(ITALIC);
    text(" Reason: Lack of Focus ",(width/2), height*0.7);
}
