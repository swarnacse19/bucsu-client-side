import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfe] overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
         <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-indigo-50 rounded-full blur-[100px] opacity-60"></div>
         <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-purple-50 rounded-full blur-[100px] opacity-60"></div>
         {/* Abstract Shapes */}
         <svg className="absolute top-20 left-0 opacity-[0.03]" width="400" height="400" viewBox="0 0 200 200">
            <path fill="#4F46E5" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.6,81.4,29.1,73.1,41.9C64.8,54.7,53.8,65.7,40.6,73.4C27.4,81.1,13.7,85.5,-0.6,86.5C-14.8,87.5,-29.7,85.1,-43,77.5C-56.3,69.9,-68.1,57.1,-76,42.4C-83.9,27.7,-87.9,11.2,-86.3,-4.9C-84.7,-21,-77.5,-36.8,-66.8,-49.2C-56.1,-61.6,-41.9,-70.7,-27.6,-77.8C-13.3,-84.9,1.1,-90,15.8,-88.1C30.5,-86.2,44.7,-76.4Z" transform="translate(100 100)" />
         </svg>
      </div>

      <Navbar />

      <main className="flex-grow flex flex-col relative">
        <div className="container mx-auto px-4 py-8 lg:py-12 flex-grow">
          
          {/* Quick Info Bar */}
          <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { icon: "🔒", title: "Secure", desc: "End-to-end Encrypted", color: "bg-green-50 text-green-600" },
               { icon: "⚡", title: "Instant", desc: "Live Result Tracking", color: "bg-blue-50 text-blue-600" },
               { icon: "🤝", title: "Reliable", desc: "Verified Student IDs", color: "bg-purple-50 text-purple-600" }
             ].map((item, idx) => (
               <div key={idx} className="bg-white/60 backdrop-blur-sm border border-white p-5 rounded-3xl flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-2xl shadow-inner`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 leading-none mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>

          {/* Main Content Wrapper */}
          <div className="relative group">
            {/* Design Element: Background Glass Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-[2.6rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative bg-white/70 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(79,70,229,0.05)] rounded-[2.5rem] p-6 md:p-12 min-h-[60vh]">
               {/* 
               */}
               <Outlet />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;