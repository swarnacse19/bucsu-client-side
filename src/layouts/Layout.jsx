import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfe] overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed w-full z-10">
         
         <Navbar />
      </div>
      <div className="h-10"></div>

      <main className="grow flex flex-col relative">
        <div className="container mx-auto px-4 py-8 lg:py-12 grow">
          
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
            <div className="absolute -inset-1 bg-linear-to-r from-indigo-100 to-purple-100 rounded-[2.6rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
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