import { motion } from 'framer-motion';
import { FaCheckCircle, FaPlay, FaShieldAlt, FaUsers } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="relative flex items-center overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-50/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-50/50 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-indigo-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              Next Gen Voting Platform
            </div>

            <h1 className="text-2xl lg:text-4xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              Empower Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Campus Voice</span> with Trust.
            </h1>
            
            <p className="text-slate-600 text-sm md:text-lg leading-relaxed mb-10 max-w-xl">
              A secure, transparent, and modern digital voting platform designed to make campus elections simpler, faster, and more reliable.
            </p>


            <div className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 cursor-pointer transition-all flex items-center gap-2"
              >
                Start Voting Now
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold cursor-pointer hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <FaPlay className="text-[10px] ml-0.5" />
                </div>
                Watch Demo
              </motion.button>
            </div>

            {/* Quick Stats/Trust Badges */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex gap-8">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-indigo-500" />
                <span className="text-sm font-semibold text-slate-500">Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="text-indigo-500" />
                <span className="text-sm font-semibold text-slate-500">10k+ Active Users</span>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image/Illustration Frame */}
            <div className="relative z-10 bg-linear-to-tr from-indigo-100 to-white p-4 rounded-[3rem] shadow-2xl border border-white/50">
              <img 
                src="https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=1000" 
                alt="Voting Illustration" 
                className="rounded-[2.5rem] shadow-inner object-cover w-full h-100"
              />
              
              {/* Floating Cards for More Detail */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3"
              >
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                  <FaCheckCircle size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Vote Verified</p>
                  <p className="text-sm font-bold text-slate-800">100% Secure</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 bg-white p-5 rounded-2xl shadow-xl border border-slate-50"
              >
                <p className="text-xs font-bold text-indigo-600 uppercase mb-2">Accurate Results</p>
                <div className="flex items-end gap-1 h-12">
                  <div className="w-3 bg-indigo-200 h-8 rounded-sm"></div>
                  <div className="w-3 bg-indigo-400 h-12 rounded-sm"></div>
                  <div className="w-3 bg-indigo-600 h-10 rounded-sm"></div>
                  <div className="w-3 bg-indigo-300 h-6 rounded-sm"></div>
                </div>
              </motion.div>
            </div>

            {/* Background Blob for Depth */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-600/5 rounded-full blur-3xl"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;