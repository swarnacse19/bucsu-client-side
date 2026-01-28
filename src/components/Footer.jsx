import { Link } from 'react-router';
import { FaVoteYea, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const y = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <FaVoteYea className="text-indigo-500 text-3xl" />
              <span className="text-2xl font-bold text-white">Vote Ballot</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              An online voting platform empowering students through secure, transparent elections.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors" aria-label="Facebook"><FaFacebook size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors" aria-label="Twitter"><FaTwitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors" aria-label="Instagram"><FaInstagram size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Why Vote Ballot', 'Stories', 'Contact Us'].map((label, i) => {
                const path = label === 'Home' ? '/' : label === 'Elections' ? '/elections' : label === 'About Us' ? '/about' : label === 'Why Vote Ballot' ? '/why-vote-ballot' : label === 'Stories' ? '/stories' : '/contact';
                return (
                  <li key={i}><Link to={path} className="text-sm hover:text-indigo-400 transition-colors">{label}</Link></li>
                );
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard/guidelines" className="text-sm hover:text-indigo-400 transition-colors">Voting Guidelines</Link></li>
              <li><a href="#faq" className="text-sm hover:text-indigo-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-indigo-500 flex-shrink-0" />
                <span className="text-sm">University Campus, Barishal, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-500 flex-shrink-0" />
                <a href="mailto:info@voteballot.com" className="text-sm hover:text-indigo-400 transition-colors">info@voteballot.com</a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-indigo-500 flex-shrink-0" />
                <a href="tel:+8801234567890" className="text-sm hover:text-indigo-400 transition-colors">+880 1824 311 959</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-center items-center gap-2">
          <p className="text-sm text-slate-400">&copy; {y} Vote Ballot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
