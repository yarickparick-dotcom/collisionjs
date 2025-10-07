//import p5 from 'p5';
//import 'p5/lib/addons/p5.sound.js';
//import 'p5.play';



let circles = []; // Array to hold circles

function setup() {
  createCanvas(800, 600);

  circles.push(new Circle(4* width / 5, 4* height / 5, 50, -5, 3));
  circles.push(new Circle(width / 4, height / 4, 50, 0, 0));
  circles.push(new Circle(width / 2, height / 2, 50, 0, 0));
  circles.push(new Circle(width / 3, height / 3, 50, 0, 0));
}

function draw() {
  background(220);

  // Update and display all circles
  for (let c of circles) {
    c.move();
    c.checkEdges();
  }

  // Check collisions between all pairs of circles
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {

      circles[i].checkForces(circles[j]);

      circles[i].checkCollision(circles[j]);
    }
  }

  for (let c of circles) {
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



  checkForces(other) {
   
    let dx = other.x - this.x;
    let dy = other.y - this.y;
    let distance = sqrt(dx * dx + dy * dy);
    
    let force=10/distance
    
    let dvx = (dx / distance) * force;
    let dvy = (dy / distance) * force;
    this.vx += dvx;
    this.vy += dvy;


  }




  checkCollision(other) {
    let dx = other.x - this.x;
    let dy = other.y - this.y;
    let distance = sqrt(dx * dx + dy * dy);
    let minDist = (this.size + other.size) / 2;


  


    if (distance < minDist) {
      // Simple elastic collision: swap velocities along the line connecting centers
      let angle = atan2(dy, dx);
      let speed1 = sqrt(this.vx * this.vx + this.vy * this.vy);
      let speed2 = sqrt(other.vx * other.vx + other.vy * other.vy);
      let dir1 = atan2(this.vy, this.vx);
      let dir2 = atan2(other.vy, other.vx);

      let vx1 = speed1 * cos(dir1 - angle);
      let vy1 = speed1 * sin(dir1 - angle);
      let vx2 = speed2 * cos(dir2 - angle);
      let vy2 = speed2 * sin(dir2 - angle);

      let vx1Final = vx2;
      let vx2Final = vx1;

      this.vx = cos(angle) * vx1Final + cos(angle + HALF_PI) * vy1;
      this.vy = sin(angle) * vx1Final + sin(angle + HALF_PI) * vy1;
      other.vx = cos(angle) * vx2Final + cos(angle + HALF_PI) * vy2;
      other.vy = sin(angle) * vx2Final + sin(angle + HALF_PI) * vy2;

      // Separate overlapping circles
      let overlap = minDist - distance;
      this.x -= overlap / 2 * cos(angle);
      this.y -= overlap / 2 * sin(angle);
      other.x += overlap / 2 * cos(angle);
      other.y += overlap / 2 * sin(angle);
    }
  }
}
