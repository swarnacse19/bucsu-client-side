import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      {/* Outer Glow Wrapper */}
      <div className="relative flex items-center justify-center">
        {/* Decorative background blur */}
        <div className="absolute w-16 h-16 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
        
        {/* Main Spinner */}
        <span className="loading loading-spinner loading-lg text-indigo-600 relative z-10"></span>
      </div>

      {/* Modern Text with Tracking */}
      <div className="text-center">
        <p className="text-xs text-slate-400 font-medium">
          Please wait a moment...
        </p>
      </div>

      {/* Bottom Progress Line (Optional) */}
      <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600 rounded-full animate-progress w-full"></div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Loading;