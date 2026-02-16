interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export class ParticlesOverlay {
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private density: number = 50;
  private intensity: number = 50;

  constructor(private ctx: CanvasRenderingContext2D, private width: number, private height: number) {
    this.initParticles();
  }

  private initParticles() {
    const count = Math.floor((this.density / 100) * 100);
    this.particles = [];
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }

  setDensity(density: number) {
    this.density = density;
    this.initParticles();
  }

  setIntensity(intensity: number) {
    this.intensity = intensity;
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.initParticles();
  }

  render() {
    const intensityFactor = this.intensity / 100;
    
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > this.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.height) particle.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * intensityFactor})`;
      this.ctx.fill();
    });
  }

  dispose() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.particles = [];
  }
}
