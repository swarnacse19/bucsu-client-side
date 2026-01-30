const About = () => (
  <section className="py-20 mt-20 bg-white" id="about">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <img src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=800" className="relative rounded-3xl shadow-2xl" alt="about" />
      </div>
      <div>
        <span className="text-indigo-600 font-bold uppercase tracking-widest text-sm">About Our Vision</span>
        <h2 className="text-4xl font-bold text-slate-900 mt-4 mb-6">Revolutionizing Student Democracy</h2>
        <p className="text-slate-600 leading-relaxed">We provide a platform where every student's vote is counted fairly and securely. Our mission is to eliminate paper waste and ensure real-time results with 100% transparency.</p>
      </div>
    </div>
  </section>
);
export default About;