import { Spin } from 'antd';

const LoadingComponent = ({ text = "Processing...", size = "large" }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-40 py-12">
      <div className="relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 animate-pulse" />
        
        {/* Main spinner */}
        <Spin size={size} />
      </div>
      
      {/* Loading text */}
      <p className="mt-4 text-gray-600 font-medium">{text}</p>
    </div>
  );
};

export default LoadingComponent;