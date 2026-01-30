import { FaShieldAlt, FaChartLine, FaUserLock, FaMobileAlt } from 'react-icons/fa';

const WhyVote = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-3xl text-emerald-500" />,
      title: "Immutable Security",
      desc: "আমাদের সিস্টেমে ডেটা এনক্রিপশন ব্যবহার করা হয়, ফলে ভোটের ফলাফল পরিবর্তন করা অসম্ভব।"
    },
    {
      icon: <FaChartLine className="text-3xl text-indigo-500" />,
      title: "Real-time Analytics",
      desc: "ভোট শেষ হওয়ার সাথে সাথেই নির্ভুল এবং স্বচ্ছ ফলাফল গ্রাফ আকারে দেখতে পারবেন।"
    },
    {
      icon: <FaUserLock className="text-3xl text-orange-500" />,
      title: "Privacy First",
      desc: "আপনার ভোট সম্পূর্ণ গোপন রাখা হয়। ভোটার কে কাকে ভোট দিয়েছে তা কেউ জানতে পারবে না।"
    },
    {
      icon: <FaMobileAlt className="text-3xl text-pink-500" />,
      title: "Vote Anywhere",
      desc: "যেকোনো ডিভাইস থেকে খুব সহজেই ভোট দেওয়া সম্ভব। কোনো অ্যাপ ডাউনলোড করার ঝামেলা নেই।"
    }
  ];

  return (
    <section className="py-24 bg-slate-50" id="why-vote-ballot">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">Why Choose <span className="text-indigo-600">Vote Ballot?</span></h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">আমরা নিশ্চিত করি আধুনিক প্রযুক্তি এবং সর্বোচ্চ নিরাপত্তা যাতে আপনার একটি ভোটও বৃথা না যায়।</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyVote;