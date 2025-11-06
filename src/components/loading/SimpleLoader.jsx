"use client";

/**
 * Simple Loader Component - No dependencies on ThemeContext
 * Used for root pages before theme context is available
 */
export default function SimpleLoader() {
  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes growShrink {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        .bar-animate {
          animation: growShrink 1.2s ease-in-out infinite;
        }
      `}</style>
      <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-gray-50 dark:bg-[#212D3D] overflow-hidden z-50">
        <div className="flex flex-col items-center justify-center">
          {/* Spinning circle */}
          <div className="relative mb-6">
            <div 
              className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-[#0E7490] spinner"
            />
          </div>
          
          {/* Audio bars */}
          <div className="flex items-end justify-center gap-1">
            {[...Array(8)].map((_, index) => {
              const delays = ['0s', '0.15s', '0.3s', '0.45s', '0.6s', '0.75s', '0.9s', '1.05s'];
              const heights = [16, 28, 40, 52, 40, 28, 40, 52];
              
              return (
                <div
                  key={index}
                  className="w-1.5 rounded-full bg-gradient-to-t from-[#0E7490] to-[#00A4FF] bar-animate"
                  style={{
                    animationDelay: delays[index],
                    transformOrigin: 'bottom center',
                    height: `${heights[index]}px`,
                    boxShadow: '0 0 8px rgba(14, 116, 144, 0.6)'
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

