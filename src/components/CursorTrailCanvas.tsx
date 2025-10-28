import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

export default function CursorTrailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const hueRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Add new particle
      const hue = hueRef.current;
      particlesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        size: 80,
        color: `hsla(${hue}, 70%, 65%, 0.08)`,
        alpha: 1,
        life: 1
      });

      // Update hue
      hueRef.current = (hueRef.current + 2) % 360;

      // Limit particles
      if (particlesRef.current.length > 25) {
        particlesRef.current.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life -= 0.015;
        particle.alpha = particle.life;
        particle.size = 80 * particle.life;

        if (particle.life > 0) {
          // Draw outer glow
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size
          );
          
          const hue = (hueRef.current - (1 - particle.life) * 20 + 360) % 360;
          gradient.addColorStop(0, `hsla(${hue}, 80%, 70%, ${particle.alpha * 0.12})`);
          gradient.addColorStop(0.5, `hsla(${hue}, 70%, 65%, ${particle.alpha * 0.08})`);
          gradient.addColorStop(1, `hsla(${hue}, 70%, 65%, 0)`);

          ctx.fillStyle = gradient;
          ctx.fillRect(
            particle.x - particle.size,
            particle.y - particle.size,
            particle.size * 2,
            particle.size * 2
          );

          return true;
        }
        return false;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
