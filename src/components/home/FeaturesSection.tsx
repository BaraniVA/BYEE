import React from 'react';
import { Shield, Users, Clock, MapPin, Star, Phone } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'All helpers are verified and rated by the community for your safety',
  },
  {
    icon: Users,
    title: 'Quick Matching',
    description: 'Find nearby helpers within minutes using our smart matching system',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Get help whenever you need it, day or night, 365 days a year',
  },
  {
    icon: MapPin,
    title: 'Location Based',
    description: 'Connect with helpers in your immediate vicinity for quick assistance',
  },
  {
    icon: Star,
    title: 'Trusted Helpers',
    description: 'Choose from our community of highly-rated and reliable helpers',
  },
  {
    icon: Phone,
    title: 'Instant Communication',
    description: 'Direct chat with your helper for seamless coordination',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose BYEE?</h2>
          <p className="mt-4 text-xl text-gray-600">
            We provide everything you need for a quick and safe escape
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-lime-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};