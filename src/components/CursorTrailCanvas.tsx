
import { useEffect, useRef } from 'react';

// Fluid cursor effect using spring interpolation
export default function CursorTrailCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Cursor position
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  // Blob position and velocity
  const blobRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, vx: 0, vy: 0 });

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
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Spring physics parameters
    const stiffness = 0.18; // how fast blob follows
    const damping = 0.75;   // how much velocity slows
    const blobRadius = 32;  // size of the blob

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Physics: move blob towards mouse
      const mouse = mouseRef.current;
      const blob = blobRef.current;
      const dx = mouse.x - blob.x;
      const dy = mouse.y - blob.y;
      blob.vx += dx * stiffness;
      blob.vy += dy * stiffness;
      blob.vx *= damping;
      blob.vy *= damping;
      blob.x += blob.vx;
      blob.y += blob.vy;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw fluid blob (circle with shadow)
      ctx.save();
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, blobRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(120, 180, 255, 0.18)';
      ctx.shadowColor = 'rgba(120, 180, 255, 0.32)';
      ctx.shadowBlur = 32;
      ctx.fill();
      ctx.restore();

      // Draw inner circle for highlight
      ctx.save();
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, blobRadius * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(120, 180, 255, 0.32)';
      ctx.fill();
      ctx.restore();

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
