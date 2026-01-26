import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-white text-slate-600 py-12 px-6 border-t border-slate-200">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="col-span-1 lg:col-span-2">
          <h3 className="text-indigo-600 text-2xl font-black mb-4 flex items-center gap-2">
            <span>🗳️</span> VoteBallot
          </h3>
          <p className="max-w-xs leading-relaxed text-slate-500">
            The next generation of voting management. Transparent, secure, and accessible for every student in our university.
          </p>
        </div>
        
        <div>
          <h4 className="text-slate-900 font-bold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm font-medium">
            <li><Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link></li>
            <li><Link to="/notices" className="hover:text-indigo-600 transition-colors">Notices</Link></li>
            <li><Link to="/report-issue" className="hover:text-indigo-600 transition-colors">Support Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 font-bold mb-4 uppercase tracking-wider text-sm">Connect With Us</h4>
          <p className="text-sm mb-4">Have questions? Reach out to the Election Commission.</p>
          <div className="flex gap-4">
            <button className="btn btn-circle btn-sm btn-ghost bg-slate-100">📧</button>
            <button className="btn btn-circle btn-sm btn-ghost bg-slate-100">🌐</button>
            <button className="btn btn-circle btn-sm btn-ghost bg-slate-100">📱</button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto border-t border-slate-100 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
        <p>© {new Date().getFullYear()} University Election Commission. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-600">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;