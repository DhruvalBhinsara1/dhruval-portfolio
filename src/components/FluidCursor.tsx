
import { useEffect, useRef } from 'react';
import useFluidCursor from '@/hooks/useFluidCursor';

const FluidCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      useFluidCursor(canvasRef.current);
    }
  }, []);

  return (
  <div className="fixed top-0 left-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} id="fluid" className="w-screen h-screen" />
    </div>
  );
};
export default FluidCursor;
