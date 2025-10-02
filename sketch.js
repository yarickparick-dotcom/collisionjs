let circles = []; // Array to hold circles

function setup() {
  createCanvas(800, 600);

  // Create two Circle instances
  circles.push(new Circle(width / 2, height / 2, 50, 5, 3));
  circles.push(new Circle(width / 3, height / 3, 50, 4, 6));
}

function draw() {
  background(220);

  // Update and display all circles
  for (let c of circles) {
    c.move();
    c.checkEdges();
    c.display();
  }
}

// Circle class
class Circle {
  constructor(x, y, size, vx, vy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = vx;
    this.vy = vy;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  checkEdges() {
    if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
      this.vx *= -1;
    }
    if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
      this.vy *= -1;
    }
  }

  display() {
    fill(0, 150, 255);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}
