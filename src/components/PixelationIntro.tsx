import React, { useState, useEffect, useRef } from 'react';

interface PixelationIntroProps {
  onComplete: () => void;
}

const PixelationIntro: React.FC<PixelationIntroProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPhase, setCurrentPhase] = useState<'loading' | 'image1' | 'pixelating1' | 'black' | 'pixelating2' | 'title' | 'complete'>('loading');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const image1Ref = useRef<HTMLImageElement>();

  useEffect(() => {
    // Load the cybernetic image
    const image1 = new Image();

    const onImageLoad = () => {
      setImagesLoaded(true);
      setCurrentPhase('image1');
    };

    const onImageError = () => {
      console.log('Image failed to load, using fallback');
      setImagesLoaded(true);
      setCurrentPhase('image1');
    };

    image1.onload = onImageLoad;
    image1.onerror = onImageError;
    
    // Use the complex cybernetic image first - fullscreen
    image1.src = '/IMG_7420.PNG';
    image1Ref.current = image1;
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to full viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawFullscreenImage = (image: HTMLImageElement, opacity: number = 1) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.globalAlpha = opacity;
      
      // Calculate to cover entire screen (crop if necessary)
      const imageAspect = image.width / image.height;
      const screenAspect = canvas.width / canvas.height;
      
      let drawWidth, drawHeight, drawX, drawY;
      
      if (imageAspect > screenAspect) {
        // Image is wider - fit height, crop width
        drawHeight = canvas.height;
        drawWidth = canvas.height * imageAspect;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
      } else {
        // Image is taller - fit width, crop height
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageAspect;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
      }
      
      ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      ctx.globalAlpha = 1;
    };

    const drawCleanTitle = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set text styles based on GODMODE typography system
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Calculate responsive font sizes - much larger for impact
      const titleSize = Math.min(canvas.width * 0.15, 180);
      
      // Draw main title - GODMODE style
      ctx.font = `300 ${titleSize}px Inter, sans-serif`;
      ctx.letterSpacing = '0.12em';
      const titleY = canvas.height / 2;
      ctx.fillText('GODMODE', canvas.width / 2, titleY);
    };

    const pixelateFullscreenImage = (image: HTMLImageElement, pixelSize: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate to cover entire screen
      const imageAspect = image.width / image.height;
      const screenAspect = canvas.width / canvas.height;
      
      let drawWidth, drawHeight, drawX, drawY;
      
      if (imageAspect > screenAspect) {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imageAspect;
        drawX = (canvas.width - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageAspect;
        drawX = 0;
        drawY = (canvas.height - drawHeight) / 2;
      }

      // Create a temporary canvas for the image
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;
      
      tempCanvas.width = drawWidth;
      tempCanvas.height = drawHeight;
      tempCtx.drawImage(image, 0, 0, drawWidth, drawHeight);
      
      // Get image data from temp canvas
      const imageData = tempCtx.getImageData(0, 0, drawWidth, drawHeight);
      const data = imageData.data;
      
      // Pixelate by sampling every nth pixel and drawing blocks
      for (let y = 0; y < drawHeight; y += pixelSize) {
        for (let x = 0; x < drawWidth; x += pixelSize) {
          const pixelIndex = (Math.floor(y) * drawWidth + Math.floor(x)) * 4;
          if (pixelIndex < data.length) {
            const r = data[pixelIndex] || 0;
            const g = data[pixelIndex + 1] || 0;
            const b = data[pixelIndex + 2] || 0;
            const a = (data[pixelIndex + 3] || 255) / 255;
            
            if (a > 0) {
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
              ctx.fillRect(drawX + x, drawY + y, pixelSize, pixelSize);
            }
          }
        }
      }
    };

    const pixelateTitle = (pixelSize: number) => {
      // First render the clean title to a temp canvas
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;
      
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      
      // Draw title on temp canvas
      tempCtx.fillStyle = 'black';
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.fillStyle = 'white';
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      
      const titleSize = Math.min(tempCanvas.width * 0.15, 180);
      
      // Main title only
      tempCtx.font = `300 ${titleSize}px Inter, sans-serif`;
      tempCtx.letterSpacing = '0.12em';
      const titleY = tempCanvas.height / 2;
      tempCtx.fillText('GODMODE', tempCanvas.width / 2, titleY);
      
      // Now pixelate from temp canvas to main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imageData.data;
      
      for (let y = 0; y < tempCanvas.height; y += pixelSize) {
        for (let x = 0; x < tempCanvas.width; x += pixelSize) {
          const pixelIndex = (Math.floor(y) * tempCanvas.width + Math.floor(x)) * 4;
          if (pixelIndex < data.length) {
            const r = data[pixelIndex] || 0;
            const g = data[pixelIndex + 1] || 0;
            const b = data[pixelIndex + 2] || 0;
            const a = (data[pixelIndex + 3] || 255) / 255;
            
            if (a > 0.1) {
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
              ctx.fillRect(x, y, pixelSize, pixelSize);
            }
          }
        }
      }
    };

    let timeoutId: number;

    const animate = () => {
      if (currentPhase === 'image1') {
        if (image1Ref.current && image1Ref.current.complete) {
          drawFullscreenImage(image1Ref.current);
        }
        // Hold for 2.5 seconds, then start pixelating
        timeoutId = window.setTimeout(() => setCurrentPhase('pixelating1'), 2500);
        
      } else if (currentPhase === 'pixelating1') {
        // Pixelate cybernetic image
        let pixelSize = 1;
        const pixelateInterval = setInterval(() => {
          if (image1Ref.current && image1Ref.current.complete) {
            pixelateFullscreenImage(image1Ref.current, pixelSize);
          }
          pixelSize = Math.floor(pixelSize * 1.4) + 1;
          
          if (pixelSize > 100) {
            clearInterval(pixelateInterval);
            setCurrentPhase('black');
          }
        }, 70);
        
      } else if (currentPhase === 'black') {
        // Black screen
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Hold black for 1.5 seconds
        timeoutId = window.setTimeout(() => setCurrentPhase('pixelating2'), 1500);
        
      } else if (currentPhase === 'pixelating2') {
        // Reverse pixelate title
        let pixelSize = 100;
        const pixelateInterval = setInterval(() => {
          pixelateTitle(pixelSize);
          pixelSize = Math.floor(pixelSize / 1.3);
          
          if (pixelSize < 2) {
            clearInterval(pixelateInterval);
            setCurrentPhase('title');
          }
        }, 70);
        
      } else if (currentPhase === 'title') {
        drawCleanTitle();
        
        // Hold for 3.5 seconds, then complete
        timeoutId = window.setTimeout(() => {
          setCurrentPhase('complete');
          onComplete();
        }, 3500);
      }
    };

    if (currentPhase !== 'loading' && currentPhase !== 'complete') {
      animate();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentPhase, imagesLoaded, onComplete]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (currentPhase === 'loading') {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="godmode-body text-white text-xl animate-pulse">Initializing GODMODE...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};

export default PixelationIntro;