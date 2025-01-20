import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-lime-50 to-white py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Need a quick escape from
            <span className="block text-lime-500">awkward situations?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            BYEE connects you with nearby helpers who can rescue you from uncomfortable
            social situations, quickly and discreetly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/requester/login"
              className="bg-lime-500 text-white px-8 py-4 rounded-lg hover:bg-lime-600 transition-colors inline-flex items-center justify-center gap-2 text-lg font-medium"
            >
              Need Help? <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/helper/login"
              className="bg-white text-lime-500 border-2 border-lime-500 px-8 py-4 rounded-lg hover:bg-lime-50 transition-colors inline-flex items-center justify-center gap-2 text-lg font-medium"
            >
              Become a Helper <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};