
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white" id="contact">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Raithara Bhandara</h3>
            <p className="text-white/80">
              Connecting farmers with smart storage solutions for a sustainable future.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-white/80 hover:text-white">Features</a></li>
              <li><a href="#warehouses" className="text-white/80 hover:text-white">Warehouses</a></li>
              <li><a href="#pricing" className="text-white/80 hover:text-white">Pricing</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-white/80">
                <Phone size={16} />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Mail size={16} />
                <span>contact@raitharabhandara.com</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <MapPin size={16} />
                <span>Bangalore, Karnataka</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Language / ಭಾಷೆ</h4>
            <select className="w-full px-3 py-2 bg-white/10 rounded-lg text-white/80 border border-white/20">
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>&copy; 2024 Raithara Bhandara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
