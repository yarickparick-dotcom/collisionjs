// Make sure to include p5.js and p5.play libraries in your HTML file

let circleSprite;

function setup() {
    createCanvas(800, 600); // Set canvas size

}

function draw() {
    background(220);
  fill(0, 150, 255); // Circle color
  noStroke();
  ellipse(width / 2, height / 2, 50, 50); // Centered circle
}


