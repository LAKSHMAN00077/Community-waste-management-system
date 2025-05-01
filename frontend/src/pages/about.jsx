import React from 'react';
import { FaRecycle, FaLeaf, FaUsers, FaChartLine, FaHandsHelping } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <FaRecycle className="text-5xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Waste Management System</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Transforming waste into resources for a cleaner, greener community
          </p>
        </div>
      </div>

      {/* Project Overview */}
      <div className="py-16 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Initiative</h2>
          <div className="space-y-6 text-gray-600">
            <p>
              The Community Waste Management System is a citizen-driven platform designed to streamline 
              waste collection, improve recycling rates, and promote sustainable practices in our neighborhoods.
            </p>
            <p>
              Born from the need to address growing waste management challenges, our system connects residents, 
              waste collectors, and local authorities through an efficient digital platform that makes proper 
              waste disposal simple and rewarding.
            </p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-6">
              <p className="font-semibold text-green-700">Our impact in numbers:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                <StatCard number="1,200+" label="Households Participating" />
                <StatCard number="75%" label="Recycling Rate Increase" />
                <StatCard number="30+" label="Waste Collectors Engaged" />
                <StatCard number="5" label="Communities Served" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">How Our System Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ProcessStep 
              icon={<FaUsers className="text-green-500 text-3xl" />}
              step="1"
              title="User Reporting"
              description="Residents report waste issues or schedule pickups through our easy-to-use platform"
            />
            <ProcessStep 
              icon={<FaChartLine className="text-green-500 text-3xl" />}
              step="2"
              title="Smart Routing"
              description="Our system optimizes collection routes for maximum efficiency"
            />
            <ProcessStep 
              icon={<FaRecycle className="text-green-500 text-3xl" />}
              step="3"
              title="Processing"
              description="Waste is properly sorted and sent to appropriate recycling or disposal facilities"
            />
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Benefits to Our Community</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <BenefitCard 
            icon={<FaLeaf className="text-green-500 text-2xl" />}
            title="Environmental Protection"
            points={[
              "Reduces landfill waste",
              "Increases recycling rates",
              "Lowers carbon footprint"
            ]}
          />
          <BenefitCard 
            icon={<FaHandsHelping className="text-green-500 text-2xl" />}
            title="Community Engagement"
            points={[
              "Creates local green jobs",
              "Educates residents on sustainability",
              "Fosters civic participation"
            ]}
          />
        </div>
      </div>

      
    </div>
  );
};

// Reusable Components
const StatCard = ({ number, label }) => (
  <div className="text-center">
    <p className="text-2xl font-bold text-green-600">{number}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

const ProcessStep = ({ icon, step, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center h-full">
    <div className="flex justify-center mb-4">{icon}</div>
    <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
      {step}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const BenefitCard = ({ icon, title, points }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <div className="mr-3">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <ul className="space-y-2 text-gray-600">
      {points.map((point, index) => (
        <li key={index} className="flex items-start">
          <span className="text-green-500 mr-2">✓</span>
          {point}
        </li>
      ))}
    </ul>
  </div>
);

const PartnerLogo = ({ name }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center w-40 h-20">
    <span className="text-gray-700 font-medium">{name}</span>
  </div>
);

export default AboutPage;