// fireworks.js
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 4 + 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.alpha = 1;
    this.done = false;
    this.particles = [];

    // Buat partikel untuk ledakan
    for (let i = 0; i < 100; i++) {
      this.particles.push(new Particle(this.x, this.y, this.color));
    }
  }

  update() {
    this.alpha -= 0.02;
    if (this.alpha <= 0) {
      this.done = true;
    }

    // Update partikel
    this.particles.forEach(particle => particle.update());
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();

    // Gambar partikel
    this.particles.forEach(particle => particle.draw());
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.color = color;
    this.alpha = 1;
    this.speed = Math.random() * 2 + 1;
    this.angle = Math.random() * Math.PI * 2;
  }

  update() {
    this.alpha -= 0.01;
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    if (this.alpha <= 0) {
      this.done = true;
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

let fireworks = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.done) {
      fireworks.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}

window.addEventListener('click', (e) => {
  const firework = new Firework(e.clientX, e.clientY);
  fireworks.push(firework);
});

animate();
