"use client";

import React, { useEffect, useRef, useState } from "react";

interface ArrowToTargetProps {
  targetId: string;
}

const ArrowToTarget: React.FC<ArrowToTargetProps> = ({ targetId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    let frameId: number;

    const drawArrow = () => {
      if (!ctx || mouse.x === null || mouse.y === null) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const target = document.getElementById(targetId);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const x0 = mouse.x;
      const y0 = mouse.y;

      const angleToCenter = Math.atan2(cy - y0, cx - x0);
      const x1 = cx - Math.cos(angleToCenter) * (rect.width / 2 + 12);
      const y1 = cy - Math.sin(angleToCenter) * (rect.height / 2 + 12);

      const midX = (x0 + x1) / 2;
      const midY = (y0 + y1) / 2;
      const offset = Math.min(200, Math.hypot(x1 - x0, y1 - y0) * 0.5);
      const t = Math.max(-1, Math.min(1, (y0 - y1) / 200));
      const controlX = midX;
      const controlY = midY + offset * t;

      const r = Math.hypot(x1 - x0, y1 - y0);
      const opacity = Math.min(0.75, (r - Math.max(rect.width, rect.height) / 2) / 750);

      ctx.strokeStyle = `rgba(255, 0, 0, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([10, 4]);

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(controlX, controlY, x1, y1);
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrowhead
      const angle = Math.atan2(y1 - controlY, x1 - controlX);
      const headLength = 10;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(
        x1 - headLength * Math.cos(angle - Math.PI / 6),
        y1 - headLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(x1, y1);
      ctx.lineTo(
        x1 - headLength * Math.cos(angle + Math.PI / 6),
        y1 - headLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    };

    const animate = () => {
      drawArrow();
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouse, targetId]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default ArrowToTarget;
