import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import clean1 from "../assets/clean1.jpg"
import clean2 from "../assets/clean2.avif"
import clean3 from "../assets/clean3.jpg"

const HomePage = () => {
  const quotes = [
    { text: "Cleanliness is next to godliness.", author: "John Wesley" },
    { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "A green planet is a clean planet.", author: "Anonymous" },
    { text: "Clean city, green city, our dream city.", author: "Community Motto" }
  ];

  const features = [
    {
      icon: "📢",
      title: "Report a Waste",
      description: "Easily report waste issues in your community through our platform"
    },
    {
      icon: "🧹",
      title: "Clean the Community",
      description: "Join organized clean-up events or initiate your own neighborhood cleaning"
    },
    {
      icon: "🏆",
      title: "Earn the Rewards",
      description: "Get recognized and rewarded for your contributions to a cleaner environment"
    }
  ];

  const images = [clean1, clean2, clean3];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🌱</span>
          <h1 className="text-xl font-bold text-green-800">Community Waste Management</h1>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/about" className="text-green-700 hover:text-green-600 font-medium">About</Link>
          <Link to="/contact" className="text-green-700 hover:text-green-600 font-medium">Contact</Link>
        </div>
        <div className="flex space-x-3">
          <Link to="/login" className="px-4 py-2 text-green-700 font-medium rounded-lg hover:bg-green-50 transition">Login</Link>
          <Link to="/signup" className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6 leading-tight">
            Transforming Waste into <span className="text-green-600">Community Wealth</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our movement to create cleaner neighborhoods through smart waste management and community participation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/signup" 
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition transform hover:scale-105"
            >
              Join Our Community
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-3 border-2 border-green-600 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Image Carousel */}
      <section className="py-8 px-4 max-w-6xl mx-auto">
        <div className="rounded-xl overflow-hidden shadow-xl">
          <Carousel 
            autoPlay 
            infiniteLoop 
            interval={5000}
            showThumbs={false} 
            showStatus={false}
            showArrows={false}
            stopOnHover={false}
            dynamicHeight={true}
          >
            {images.map((img, i) => (
              <div key={i} className="relative h-64 md:h-96">
                <img 
                  src={img} 
                  alt={`Community clean initiative ${i + 1}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <p className="text-white text-lg md:text-xl font-medium">
                    {quotes[i].text} <span className="text-green-300">— {quotes[i].author}</span>
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            How Our System Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-green-700 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-100 rounded-xl p-8 md:p-12 shadow-inner">
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
              Ready to make a difference in your community?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of residents who are already contributing to a cleaner, greener neighborhood.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/signup" 
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              >
                Sign Up Now
              </Link>
              <Link 
                to="/login" 
                className="px-6 py-3 border border-green-600 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition"
              >
                Existing Member? Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl italic mb-4">
            "{randomQuote.text}"
          </blockquote>
          <p className="font-medium text-green-100">— {randomQuote.author}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-15">
          <div>
            <h3 className="text-xl font-bold mb-4">Community Waste Management</h3>
            <p className="text-green-200">Making our neighborhoods cleaner and greener together.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-green-200 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-green-200 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Account</h4>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-green-200 hover:text-white">Login</Link></li>
              <li><Link to="/signup" className="text-green-200 hover:text-white">Sign Up</Link></li>
              <li><Link to="/forgot-password" className="text-green-200 hover:text-white">Forgot Password</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-4 text-center text-green-300">
          <p>© {new Date().getFullYear()} Community Waste Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;