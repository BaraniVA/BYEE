import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'User',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    quote: 'BYEE saved me from an incredibly awkward blind date. The helper arrived within minutes!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Helper',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    quote: 'Being a helper on BYEE lets me help others while earning extra income. Win-win!',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'User',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    quote: 'The app is so easy to use, and the helpers are always professional and punctual.',
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="mt-4 text-xl text-gray-600">
            Join thousands of satisfied users who trust BYEE
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-lime-500 text-lime-500" />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="text-gray-600 italic">"{testimonial.quote}"</blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};