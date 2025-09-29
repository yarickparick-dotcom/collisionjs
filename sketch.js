// Make sure to include p5.js and p5.play libraries in your HTML file

let circleSprite;

function setup() {
    createCanvas(800, 600); // Set canvas size
    circleSprite = createSprite(width / 2, height / 2, 50, 50); // Centered circle
    circleSprite.shapeColor = color(0, 150, 255);
    circleSprite.draw = function() {
        ellipse(0, 0, 50, 50);
    };
}

function draw() {
    background(220);
    drawSprites();
}