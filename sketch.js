import p5 from 'p5';

const sketch = (p) => {
  let circles = [];

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
      if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > p.width) {
        this.vx *= -1;
      }
      if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > p.height) {
        this.vy *= -1;
      }
    }

    display() {
      p.fill(0, 150, 255);
      p.noStroke();
      p.ellipse(this.x, this.y, this.size, this.size);
    }

    checkForces(other) {
      const dx = other.x - this.x;
      const dy = other.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1e-6;

      const force = 10 / distance;

      const dvx = (dx / distance) * force;
      const dvy = (dy / distance) * force;
      this.vx += dvx;
      this.vy += dvy;
    }

    checkCollision(other) {
      const dx = other.x - this.x;
      const dy = other.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1e-6;
      const minDist = (this.size + other.size) / 2;

      if (distance < minDist) {
        const angle = Math.atan2(dy, dx);
        const speed1 = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const speed2 = Math.sqrt(other.vx * other.vx + other.vy * other.vy);
        const dir1 = Math.atan2(this.vy, this.vx);
        const dir2 = Math.atan2(other.vy, other.vx);

        const vx1 = speed1 * Math.cos(dir1 - angle);
        const vy1 = speed1 * Math.sin(dir1 - angle);
        const vx2 = speed2 * Math.cos(dir2 - angle);
        const vy2 = speed2 * Math.sin(dir2 - angle);

        const vx1Final = vx2;
        const vx2Final = vx1;

        this.vx = Math.cos(angle) * vx1Final + Math.cos(angle + Math.PI / 2) * vy1;
        this.vy = Math.sin(angle) * vx1Final + Math.sin(angle + Math.PI / 2) * vy1;
        other.vx = Math.cos(angle) * vx2Final + Math.cos(angle + Math.PI / 2) * vy2;
        other.vy = Math.sin(angle) * vx2Final + Math.sin(angle + Math.PI / 2) * vy2;

        const overlap = minDist - distance;
        this.x -= (overlap / 2) * Math.cos(angle);
        this.y -= (overlap / 2) * Math.sin(angle);
        other.x += (overlap / 2) * Math.cos(angle);
        other.y += (overlap / 2) * Math.sin(angle);
      }
    }
  }

  p.setup = () => {
    p.createCanvas(800, 600);

    circles.push(new Circle((4 * p.width) / 5, (4 * p.height) / 5, 50, -5, 3));
    circles.push(new Circle(p.width / 4, p.height / 4, 50, 0, 0));
    circles.push(new Circle(p.width / 2, p.height / 2, 50, 0, 0));
    circles.push(new Circle(p.width / 3, p.height / 3, 50, 0, 0));
  };

  p.draw = () => {
    p.background(220);

    for (const c of circles) {
      c.move();
      c.checkEdges();
    }

    for (let i = 0; i < circles.length; i++) {
      for (let j = i + 1; j < circles.length; j++) {
        circles[i].checkForces(circles[j]);
        circles[i].checkCollision(circles[j]);
      }
    }

    for (const c of circles) {
      c.display();
    }
  };
};

new p5(sketch);
