"use client";

import React, { useContext } from 'react';
import { ThemeContext } from '@/components/context/theme-context';

/**
 * Universal Loading Component - Enhanced Creative Version
 * Features advanced sound-themed animations with multiple visual effects
 */
const Loading = ({ 
  size = 'default',
  message = 'Syncing sound waves...',
  showMessage = true 
}) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const sizeConfig = {
    small: {
      container: 'w-20 h-20',
      bar: 'w-1.5',
      message: 'text-sm',
      spacing: 'mb-3',
      icon: 'w-10 h-10'
    },
    default: {
      container: 'w-32 h-32',
      bar: 'w-2.5',
      message: 'text-base',
      spacing: 'mb-6',
      icon: 'w-16 h-16'
    },
    large: {
      container: 'w-40 h-40',
      bar: 'w-3.5',
      message: 'text-lg',
      spacing: 'mb-8',
      icon: 'w-24 h-24'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center w-screen h-screen bg-gray-50 dark:bg-[#212D3D] overflow-hidden z-50">
      {/* Animated Background with Moving Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Radial Gradient */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 'min(100vw, 800px)',
            height: 'min(100vh, 800px)',
            background: isDark
              ? 'radial-gradient(circle, rgba(14, 116, 144, 0.1) 0%, rgba(31, 75, 88, 0.05) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(14, 116, 144, 0.06) 0%, rgba(31, 75, 88, 0.03) 40%, transparent 70%)',
            animation: 'pulseGlow 4s ease-in-out infinite'
          }}
        />

        {/* Animated Grid Lines */}
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? 'rgba(14, 116, 144, 0.3)' : 'rgba(14, 116, 144, 0.2)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? 'rgba(14, 116, 144, 0.3)' : 'rgba(14, 116, 144, 0.2)'} 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            backgroundPosition: '0 0',
            animation: 'moveGrid 20s linear infinite'
          }}
        />

        {/* Moving Diagonal Lines */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, index) => (
            <div
              key={`diagonal-${index}`}
              className="absolute w-full h-px"
              style={{
                background: `linear-gradient(90deg, 
                  transparent, 
                  ${isDark ? 'rgba(14, 116, 144, 0.2)' : 'rgba(14, 116, 144, 0.15)'}, 
                  transparent)`,
                transform: `rotate(${index * 30}deg)`,
                transformOrigin: 'center center',
                top: `${index * 20}%`,
                animation: `moveDiagonal ${15 + index * 2}s linear infinite`,
                animationDelay: `${index * 0.5}s`,
                opacity: isDark ? 0.3 : 0.2
              }}
            />
          ))}
        </div>

        {/* Animated Wave Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isDark ? 'rgba(14, 116, 144, 0.1)' : 'rgba(14, 116, 144, 0.08)'} stopOpacity="1">
                  <animate attributeName="stop-color" 
                    values={`${isDark ? 'rgba(14, 116, 144, 0.1)' : 'rgba(14, 116, 144, 0.08)'};${isDark ? 'rgba(0, 164, 255, 0.15)' : 'rgba(0, 164, 255, 0.1)'};${isDark ? 'rgba(14, 116, 144, 0.1)' : 'rgba(14, 116, 144, 0.08)'}`}
                    dur="4s" repeatCount="indefinite"/>
                </stop>
                <stop offset="100%" stopColor={isDark ? 'rgba(0, 164, 255, 0.1)' : 'rgba(0, 164, 255, 0.08)'} stopOpacity="1">
                  <animate attributeName="stop-color" 
                    values={`${isDark ? 'rgba(0, 164, 255, 0.1)' : 'rgba(0, 164, 255, 0.08)'};${isDark ? 'rgba(14, 116, 144, 0.15)' : 'rgba(14, 116, 144, 0.1)'};${isDark ? 'rgba(0, 164, 255, 0.1)' : 'rgba(0, 164, 255, 0.08)'}`}
                    dur="4s" repeatCount="indefinite"/>
                </stop>
              </linearGradient>
            </defs>
            {[...Array(3)].map((_, i) => (
              <path
                key={`wave-${i}`}
                d={`M 0,${30 + i * 20} Q 250,${25 + i * 20} 500,${30 + i * 20} T 1000,${30 + i * 20}`}
                fill="none"
                stroke="url(#waveGradient)"
                strokeWidth="0.5"
                style={{
                  animation: `waveMove ${8 + i * 2}s ease-in-out infinite`,
                  animationDelay: `${i * 1.5}s`,
                  opacity: isDark ? 0.4 : 0.3
                }}
              />
            ))}
          </svg>
        </div>

        {/* Moving Gradient Orbs */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, index) => (
            <div
              key={`orb-${index}`}
              className="absolute rounded-full blur-3xl"
              style={{
                width: `${200 + index * 100}px`,
                height: `${200 + index * 100}px`,
                background: `radial-gradient(circle, 
                  ${isDark ? 'rgba(14, 116, 144, 0.15)' : 'rgba(14, 116, 144, 0.1)'}, 
                  transparent 70%)`,
                left: `${20 + index * 25}%`,
                top: `${30 + index * 15}%`,
                animation: `floatOrb ${12 + index * 3}s ease-in-out infinite`,
                animationDelay: `${index * 1.5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Container - Centered with Vercel-like Animation */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Vercel-style Smooth Gradient Orb */}
        <div className={`relative mb-8 ${size === 'large' ? 'w-24 h-24' : size === 'default' ? 'w-20 h-20' : 'w-16 h-16'}`}>
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, 
                ${isDark ? '#0E7490' : '#0E7490'}, 
                ${isDark ? '#00A4FF' : '#00A4FF'}, 
                ${isDark ? '#1f4b58' : '#1f4b58'}, 
                ${isDark ? '#0E7490' : '#0E7490'})`,
              animation: 'vercelSpin 3s linear infinite',
              filter: 'blur(1px)',
              opacity: isDark ? 0.6 : 0.5
            }}
          />
          <div 
            className="absolute inset-1 rounded-full bg-gray-50 dark:bg-[#212D3D]"
          />
          <div 
            className="absolute inset-2 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, 
                ${isDark ? 'rgba(14, 116, 144, 0.4)' : 'rgba(14, 116, 144, 0.3)'}, 
                transparent 70%)`,
              animation: 'vercelPulse 2s ease-in-out infinite'
            }}
          />
        </div>

        {/* Vercel-style Smooth Audio Visualizer Bars */}
        <div className={`flex items-end justify-center gap-1 ${config.spacing}`}>
          {[...Array(12)].map((_, index) => {
            const delays = Array.from({ length: 12 }, (_, i) => `${i * 0.1}s`);
            const heights = [
              25, 40, 55, 70, 85, 100, 85, 70, 55, 70, 85, 100
            ].map(h => size === 'large' ? h * 1.3 : size === 'small' ? h * 0.6 : h);
            
            return (
              <div
                key={index}
                className={`${size === 'large' ? 'w-2.5' : size === 'default' ? 'w-2' : 'w-1.5'} rounded-full relative`}
                style={{
                  height: `${heights[index]}px`,
                  background: `linear-gradient(to top, 
                    ${isDark ? '#0E7490' : '#0E7490'}, 
                    ${isDark ? '#00A4FF' : '#00A4FF'})`,
                  animation: `vercelBarGrow 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                  animationDelay: delays[index],
                  transformOrigin: 'bottom center',
                  opacity: 0.8
                }}
              >
                {/* Smooth highlight */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/3 rounded-full"
                  style={{
                    background: isDark
                      ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent)'
                      : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent)'
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Vercel-style Smooth Gradient Line Animation */}
        <div className={`relative mb-6 ${size === 'large' ? 'w-32' : size === 'default' ? 'w-24' : 'w-20'} h-0.5`}>
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, 
                transparent, 
                ${isDark ? '#0E7490' : '#0E7490'}, 
                ${isDark ? '#00A4FF' : '#00A4FF'}, 
                ${isDark ? '#0E7490' : '#0E7490'}, 
                transparent)`,
              backgroundSize: '200% 100%',
              animation: 'vercelShimmer 2s ease-in-out infinite',
              opacity: isDark ? 0.6 : 0.5
            }}
          />
        </div>

        {/* Clean Loading Message */}
        {showMessage && (
          <div className="text-center">
            <p 
              className={`${config.message} font-medium text-gray-700 dark:text-gray-300 mb-4`}
              style={{
                letterSpacing: '0.3px'
              }}
            >
              {message}
              <span 
                className="inline-block w-0.5 h-4 bg-[#0E7490] ml-1.5 align-middle"
                style={{ animation: 'blink 1.2s infinite' }}
              />
            </p>
            
            {/* Vercel-style Smooth Progress Dots */}
            <div className="flex items-center justify-center gap-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="rounded-full"
                  style={{
                    width: size === 'large' ? '8px' : size === 'default' ? '6px' : '5px',
                    height: size === 'large' ? '8px' : size === 'default' ? '6px' : '5px',
                    background: `linear-gradient(135deg, #0E7490, #00A4FF)`,
                    animation: `vercelDotScale 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                    animationDelay: `${index * 0.25}s`,
                    opacity: isDark ? 0.7 : 0.6
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

// Compact inline version - Enhanced with smooth Vercel-style animations
export const LoadingInline = ({ size = 'small', className = '', message = 'Syncing sound waves...' }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const sizeConfig = {
    small: {
      container: 'w-20 h-20',
      orb: 'w-14 h-14',
      bar: 'w-1.5',
      heights: [14, 24, 34, 44, 34, 24, 34, 44],
      messageSize: 'text-sm'
    },
    default: {
      container: 'w-32 h-32',
      orb: 'w-20 h-20',
      bar: 'w-2',
      heights: [20, 36, 52, 68, 52, 36, 52, 68],
      messageSize: 'text-base'
    },
    large: {
      container: 'w-40 h-40',
      orb: 'w-24 h-24',
      bar: 'w-2.5',
      heights: [24, 44, 64, 84, 64, 44, 64, 84],
      messageSize: 'text-lg'
    }
  };

  const config = sizeConfig[size] || sizeConfig.small;
  const delays = Array.from({ length: 8 }, (_, i) => `${i * 0.1}s`);

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`relative ${config.container} flex items-center justify-center mb-4`}>
        {/* Vercel-style Smooth Gradient Orb */}
        <div className={`absolute ${config.orb}`}>
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, 
                ${isDark ? '#0E7490' : '#0E7490'}, 
                ${isDark ? '#00A4FF' : '#00A4FF'}, 
                ${isDark ? '#1f4b58' : '#1f4b58'}, 
                ${isDark ? '#0E7490' : '#0E7490'})`,
              animation: 'vercelSpin 3s linear infinite',
              filter: 'blur(1px)',
              opacity: isDark ? 0.6 : 0.5
            }}
          />
          <div 
            className="absolute inset-1 rounded-full bg-white dark:bg-[#212D3D]"
          />
          <div 
            className="absolute inset-2 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, 
                ${isDark ? 'rgba(14, 116, 144, 0.4)' : 'rgba(14, 116, 144, 0.3)'}, 
                transparent 70%)`,
              animation: 'vercelPulse 2s ease-in-out infinite'
            }}
          />
        </div>
        
        {/* Vercel-style Smooth Audio Visualizer Bars */}
        <div className={`flex items-end justify-center gap-1 relative z-10`}>
          {[...Array(8)].map((_, index) => {
            return (
              <div
                key={index}
                className={`${config.bar} rounded-full relative`}
                style={{
                  height: `${config.heights[index]}px`,
                  background: `linear-gradient(to top, 
                    ${isDark ? '#0E7490' : '#0E7490'}, 
                    ${isDark ? '#00A4FF' : '#00A4FF'})`,
                  animation: `vercelBarGrow 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                  animationDelay: delays[index],
                  transformOrigin: 'bottom center',
                  opacity: 0.8
                }}
              >
                {/* Smooth highlight */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1/3 rounded-full"
                  style={{
                    background: isDark
                      ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent)'
                      : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent)'
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Loading Message */}
      {message && (
        <div className="text-center">
          <p 
            className={`${config.messageSize} font-medium text-gray-700 dark:text-gray-300`}
            style={{
              letterSpacing: '0.3px'
            }}
          >
            {message}
            <span 
              className="inline-block w-0.5 h-4 bg-[#0E7490] ml-1.5 align-middle"
              style={{ animation: 'blink 1.2s infinite' }}
            />
          </p>
        </div>
      )}
    </div>
  );
};

export default Loading;
