import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setSubmissionStatus('success');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset status after 5 seconds
    setTimeout(() => setSubmissionStatus(null), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Our Waste Management Team</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            We're here to help with all your waste management questions and concerns
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ContactCard 
            icon={<FaMapMarkerAlt className="text-green-500 text-3xl" />}
            title="Our Office"
            info="RGUKT - NUZVID"
            info2="Vijayawada, 521202"
          />
          <ContactCard 
            icon={<FaPhone className="text-green-500 text-3xl" />}
            title="Call Us"
            info="Main: +91 9182736455"
            info2="Emergency: +91 7865487621 "
          />
          <ContactCard 
            icon={<FaEnvelope className="text-green-500 text-3xl" />}
            title="Email Us"
            info="info@communitywaste.org"
            info2="support@communitywaste.org"
          />
        </div>
      </div>

      {/* Contact Form and Map */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              
              {submissionStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="waste-collection">Waste Collection Issue</option>
                    <option value="recycling">Recycling Information</option>
                    <option value="bulk-items">Bulk Item Pickup</option>
                    <option value="hazardous-waste">Hazardous Waste Disposal</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Office Hours</h3>
                <div className="flex items-start mb-3">
                  <FaClock className="text-green-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Monday - Friday</p>
                    <p className="text-gray-600">8:00 AM - 5:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start mb-3">
                  <FaClock className="text-green-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Saturday</p>
                    <p className="text-gray-600">9:00 AM - 1:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaClock className="text-green-500 mt-1 mr-3" />
                  <div>
                    <p className="font-medium">Sunday</p>
                    <p className="text-gray-600">Closed</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-green-600 hover:text-green-800">
                    <FaFacebook className="text-2xl" />
                  </a>
                  <a href="#" className="text-green-600 hover:text-green-800">
                    <FaTwitter className="text-2xl" />
                  </a>
                  <a href="#" className="text-green-600 hover:text-green-800">
                    <FaInstagram className="text-2xl" />
                  </a>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Emergency After-Hours Contact</h4>
                  <p className="text-gray-600">For urgent waste issues outside office hours, please call:</p>
                  <p className="text-green-600 font-bold mt-2">+91 7865487621</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const ContactCard = ({ icon, title, info, info2 }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center h-full">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{info}</p>
    {info2 && <p className="text-gray-600">{info2}</p>}
  </div>
);

const FAQItem = ({ question, answer }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <details className="group">
      <summary className="list-none p-4 bg-white hover:bg-gray-50 cursor-pointer flex justify-between items-center">
        <span className="font-medium text-gray-800">{question}</span>
        <span className="text-green-500 group-open:hidden">+</span>
        <span className="text-green-500 hidden group-open:inline">−</span>
      </summary>
      <div className="p-4 bg-gray-50 text-gray-600">
        {answer}
      </div>
    </details>
  </div>
);

export default ContactPage;