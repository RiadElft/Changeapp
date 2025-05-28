import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer 
      className="text-gray-300 py-6 mt-auto border-t border-gray-700/50"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
        backdropFilter: 'blur(20px)'
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400">© {new Date().getFullYear()} <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-semibold">مودع</span>. Tous droits réservés.</p>
        <div className="mt-3 space-x-1">
          <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-green-500/10 inline-block">Conditions</a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-blue-500/10 inline-block">Confidentialité</a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-yellow-500/10 inline-block">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;