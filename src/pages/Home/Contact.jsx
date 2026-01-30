import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className="py-24 bg-slate-50" id="contact">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-indigo-100 overflow-hidden flex flex-col lg:flex-row">
          {/* Contact Info */}
          <div className="bg-indigo-600 lg:w-1/3 p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-indigo-100 mb-12">আমাদের সম্পর্কে কোনো প্রশ্ন থাকলে বা সাহায্যের প্রয়োজন হলে নির্দ্বিধায় মেসেজ দিন।</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-lg"><FaEnvelope /></div>
                <span>support@voteballot.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-lg"><FaPhoneAlt /></div>
                <span>+880 1824 311 959</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 p-3 rounded-lg"><FaMapMarkerAlt /></div>
                <span>Barishal, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3 p-12">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <input type="email" placeholder="example@mail.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-slate-700">Message</label>
                <textarea rows="4" placeholder="How can we help?" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
              </div>
              <button className="md:col-span-2 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-95">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;