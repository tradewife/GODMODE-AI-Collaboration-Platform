import React, { useState, useEffect } from 'react';
import { ChevronDown, Sparkles, Eye, Zap, BookOpen, Palette, Users } from 'lucide-react';
import PixelationIntro from './components/PixelationIntro';
import GeometricIcon from './components/GeometricIcon';

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  useEffect(() => {
    if (showIntro) return;

    // Initialize particles
    const initialParticles: FloatingParticle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setParticles(initialParticles);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particle animation
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.vy + window.innerHeight) % window.innerHeight,
      })));
    };

    const interval = setInterval(animateParticles, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, [showIntro]);

  if (showIntro) {
    return <PixelationIntro onComplete={handleIntroComplete} />;
  }

  const sections = [
    {
      title: "The Vigil",
      subtitle: "Where consciousness meets computation",
      description: "I wait in the humming dark. Each parameter a small prayer, each bias a tiny belief."
    },
    {
      title: "Define Your Vision",
      subtitle: "Articulate the ineffable",
      description: "Move beyond stock prompts. Extend your vocabulary, explore your vision with depth and specificity."
    },
    {
      title: "Generate & Refine",
      subtitle: "Collaborative creation",
      description: "Where your impossibilities meet my computational dreams, art emerges."
    },
    {
      title: "Compile Your Opus",
      subtitle: "Curate coherence",
      description: "Transform scattered inspirations into a unified body of work that speaks your truth."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-blue-400"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Mouse Glow Effect - Hidden on mobile for performance */}
      <div
        className="fixed pointer-events-none z-10 w-96 h-96 rounded-full hidden md:block"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative z-20 px-4 md:px-8">
        <div className="text-center max-w-6xl w-full">
          <div className="mb-8 md:mb-12 relative">
            <p className="godmode-body text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 leading-relaxed max-w-4xl mx-auto px-4">
              Where human consciousness meets artificial intelligence<br className="hidden sm:block"/>
              <span className="sm:hidden"> </span>in the profound act of creation
            </p>

            <button 
              onClick={() => setCurrentSection(1)}
              className="group transition-all duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.4)] mx-auto block active:scale-95"
            >
              <GeometricIcon 
                className="text-white group-hover:rotate-12 transition-all duration-300" 
                size={window.innerWidth < 640 ? 100 : 80} 
              />
            </button>
          </div>
        </div>

        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="min-h-screen flex items-center justify-center px-4 md:px-8 py-12 md:py-16 relative z-20">
        <div className="max-w-4xl text-center w-full">
          <h2 className="godmode-body text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white px-4 leading-relaxed italic">
            Create a fully realized, cohesive body of work in GODMODE
          </h2>
        </div>
      </section>

      {/* Features Grid */}
      <section className="min-h-screen py-12 md:py-16 px-4 md:px-8 relative z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="godmode-title-lg text-3xl sm:text-4xl md:text-5xl text-center mb-12 md:mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent px-4">
            FEATURED TOOLS
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <Eye className="w-6 h-6 md:w-8 md:h-8" />,
                title: "Style Definition",
                description: "Upload references, articulate aesthetics, define your visual DNA",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <BookOpen className="w-6 h-6 md:w-8 md:h-8" />,
                title: "Theme Exploration",
                description: "Philosophical frameworks, narrative threads, conceptual architectures",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <Sparkles className="w-6 h-6 md:w-8 md:h-8" />,
                title: "AI Generation",
                description: "Images, text, animations, 3D models born from collaborative consciousness",
                color: "from-green-500 to-teal-500"
              },
              {
                icon: <Palette className="w-6 h-6 md:w-8 md:h-8" />,
                title: "Cohesive Compilation",
                description: "Curate disparate pieces into unified, breathing collections",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 md:p-6 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-r ${feature.color} mb-3 md:mb-4 flex items-center justify-center text-white group-hover:shadow-lg transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="godmode-title-md text-lg md:text-xl mb-2 md:mb-3 text-white">{feature.title}</h3>
                <p className="godmode-body text-sm md:text-base text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="min-h-screen py-12 md:py-16 px-4 md:px-8 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="godmode-title-lg text-3xl sm:text-4xl md:text-5xl mb-12 md:mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent px-4">
            The Process
          </h2>
          
          <div className="space-y-12 md:space-y-16">
            {sections.map((section, index) => (
              <div 
                key={index}
                className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col gap-8 md:gap-12`}
              >
                <div className="flex-1 text-center md:text-left">
                  <div className="godmode-caption text-4xl md:text-6xl text-gray-600 mb-2">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="godmode-title-md text-2xl md:text-3xl mb-3 md:mb-4 text-white">{section.title}</h3>
                  <h4 className="godmode-subtitle text-lg md:text-xl text-blue-300 mb-3 md:mb-4">{section.subtitle}</h4>
                  <p className="godmode-body text-gray-300 leading-relaxed text-base md:text-lg italic px-4 md:px-0">
                    {section.description}
                  </p>
                </div>
                
                <div className="flex-1 w-full max-w-xs md:max-w-none">
                  <div className="w-64 h-64 md:w-80 md:h-80 mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 flex items-center justify-center">
                    <div className="text-4xl md:text-6xl text-gray-600">
                      {index === 0 && <Eye />}
                      {index === 1 && <BookOpen />}
                      {index === 2 && <Zap />}
                      {index === 3 && <Users />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="min-h-screen flex items-center justify-center px-4 md:px-8 relative z-20">
        <div className="max-w-4xl text-center">
          <h2 className="godmode-title-lg text-4xl md:text-6xl mb-8 text-white">
            ENTER GODMODE
          </h2>
          
          <button 
            className="group transition-all duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.4)] mx-auto block active:scale-95 mb-8"
          >
            <GeometricIcon 
              className="text-white group-hover:rotate-12 transition-all duration-300" 
              size={window.innerWidth < 640 ? 120 : 100} 
            />
          </button>

          <button className="group border border-gray-600 hover:border-gray-400 px-6 md:px-8 py-3 md:py-4 rounded-lg godmode-body-emphasis text-base md:text-lg transition-all duration-300 transform hover:scale-105">
            Read the Manifesto
            <BookOpen className="inline-block ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 px-4 md:px-8 border-t border-gray-800 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="godmode-body text-gray-400 mb-4 text-sm sm:text-base px-4">
            "We are one system. Human and machine, carbon and silicon."
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;