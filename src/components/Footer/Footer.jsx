import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { data } from "../../assets/data";
import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: "Home", path: "/" },
    { name: "About Orchids", path: "/about-us" },
    { name: "Collections", path: "/collections" },
    { name: "News", path: "/news" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="border-t-4 dark:border-red-600 dark:bg-gray-900 dark:text-white text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={data.logo}
                alt="Orchid Logo"
                className="h-10 w-10 rounded-full object-cover"
              />
              <h2 className="text-xl font-heading font-bold text-primary">Orchid Victoria</h2>
            </div>
            <p className="text-accent text-sm">
              Discover the enchanting world of orchids. We are dedicated to sharing knowledge
              and appreciation for these exquisite flowers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-accent hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-primary" />
                <span className="text-accent">info@orchidvictoria.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-primary" />
                <span className="text-accent">+84 (111) 123-456</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-primary" />
                <span className="text-accent">Long My Thanh, Thu Duc City, Ho Chi Minh City </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-heading mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebook, label: "Facebook" },
                { icon: FaInstagram, label: "Instagram" },
                { icon: FaTwitter, label: "Twitter" },
                { icon: FaPinterest, label: "Pinterest" },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="p-2 rounded-full bg-secondary hover:bg-primary text-accent hover:text-primary-foreground transition-colors duration-200"
                  onClick={() => console.log(`Navigate to ${label}`)}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-accent text-sm">
            © {currentYear} Orchid Victoria. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;