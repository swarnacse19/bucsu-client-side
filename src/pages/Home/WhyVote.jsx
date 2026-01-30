import { FaShieldAlt, FaChartLine, FaUserLock, FaMobileAlt } from 'react-icons/fa';

const WhyVote = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-3xl text-emerald-500" />,
      title: "Immutable Security",
      desc: "Our system uses advanced data encryption, making it impossible to tamper with or alter election results."
    },
    {
      icon: <FaChartLine className="text-3xl text-indigo-500" />,
      title: "Real-time Analytics",
      desc: "View accurate, transparent election results instantly after voting ends, presented through clear visual graphs."
    },
    {
      icon: <FaUserLock className="text-3xl text-orange-500" />,
      title: "Privacy First",
      desc: "Your vote remains completely confidential. No one can track who you voted for—your privacy is fully protected."
    },
    {
      icon: <FaMobileAlt className="text-3xl text-pink-500" />,
      title: "Vote Anywhere",
      desc: "Cast your vote easily from any device, anytime. No app installation required—just a secure web experience."
    }
  ];

  return (
    <section className="py-24 bg-slate-50" id="why-vote-ballot">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900">
            Why Choose <span className="text-indigo-600">Vote Ballot?</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            We ensure modern technology and maximum security so that every single vote truly counts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
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
