import React from 'react';
import { UserPlus, MapPin, MessageSquare, ThumbsUp } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Create an Account',
    description: 'Sign up in less than a minute and verify your identity',
  },
  {
    icon: MapPin,
    title: 'Share Your Location',
    description: 'Enable location services to find nearby helpers',
  },
  {
    icon: MessageSquare,
    title: 'Describe Your Situation',
    description: 'Quickly explain your situation and set urgency level',
  },
  {
    icon: ThumbsUp,
    title: 'Get Help',
    description: 'Connect with a helper and get rescued from your situation',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600">
            Get help in 4 simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-lime-200" />
              )}
              <div className="relative bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-lime-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};