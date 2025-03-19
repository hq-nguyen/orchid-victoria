import { Link } from 'react-router-dom';
import { data } from '../../assets/data';

const Hero = () => {
  return (
    <section className="relative h-[36rem] overflow-hidden">
      {/* Background image with proper sizing */}
      <div className="absolute inset-0">
        <img 
          src={data.background} 
          alt="Orchid background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>
      
      {/* Content container with better positioning */}
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Discover the Beauty of <span className="text-purple-300">Orchids</span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Explore a curated collection of the world's most exquisite orchids, with expert growing tips and conservation news.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/collections" 
              className="bg-rose-600 text-white py-3 px-8 rounded-lg hover:bg-rose-700 transition duration-300 text-lg font-medium"
            >
              Explore Our Orchids
            </Link>
            
            <Link 
              to="/news" 
              className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-lg hover:bg-white/10 transition duration-300 text-lg font-medium"
            >
              Latest News
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;