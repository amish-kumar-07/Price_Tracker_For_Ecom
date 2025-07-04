import React from 'react';
import Link from 'next/link';
import { NavbarDemo } from './dashboard/_components/navbar';
import { 
  Search, 
  Bell, 
  Shield, 
  Smartphone, 
  CheckCircle, 
  Star,
  ArrowRight,
  Eye,
  Target,
  Zap,
  Users,
  Mail,
  Github,
  Twitter
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Real-time Price Tracking",
      description: "Monitor prices across thousands of retailers and marketplaces automatically."
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Instant Email Alerts",
      description: "Get notified immediately when your tracked products drop to your target price."
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Multi-platform Support",
      description: "Works with Amazon, eBay, Best Buy, Target, and hundreds of other stores."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Clean Dashboard UI",
      description: "Beautiful, intuitive interface to manage all your price watches in one place."
    }
  ];

  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Search Your Product",
      description: "Paste any product URL or search by name to find what you want to track."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Set Target Price",
      description: "Choose your ideal price point and we'll monitor it 24/7 for you."
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Get Instant Alerts",
      description: "Receive email notifications the moment prices drop to your target."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Smart Shopper",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "I've saved over $500 this year using PriceWatcher! The alerts are instant and accurate.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Tech Enthusiast",
      avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "Finally found a price tracker that actually works. Clean interface and reliable notifications.",
      rating: 5
    },
    {
      name: "Emma Wilson",
      role: "Budget Conscious",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "Love how easy it is to track multiple products. The dashboard makes everything so organized!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <div className="w-full flex justify-evenly items-center">
        <NavbarDemo />
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Track Your Favorite Products.
              <span className="text-indigo-400 block">Get Notified When Prices Drop.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Never miss a deal again. PriceWatcher monitors millions of products across the web 
              and alerts you instantly when prices hit your target.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={"/signin"} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
              >
                <span>Start Tracking For Free</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a 
                href="#how-it-works"
                className="text-indigo-400 hover:text-indigo-300 px-8 py-4 font-semibold transition-colors flex items-center space-x-2"
              >
                <span>See How It Works</span>
                <Eye className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Hero Image/Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-indigo-400 mb-2">2M+</div>
              <div className="text-gray-400">Products Tracked</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">$50M+</div>
              <div className="text-gray-400">Money Saved</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">100K+</div>
              <div className="text-gray-400">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Save Money
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful features designed to help you find the best deals and never overpay again.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-900 border border-gray-700 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-indigo-500 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Getting started is simple. Track any product in just three easy steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto shadow-lg">
                  {step.icon}
                </div>
                <div className="text-sm font-semibold text-indigo-400 mb-2">
                  STEP {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Loved by Smart Shoppers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of users who are saving money every day with PriceWatcher.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gray-900 border border-gray-700 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-indigo-500 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Saving Money?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join over 100,000 smart shoppers who never pay full price. Start tracking your first product today.
          </p>
          <Link 
            href={"/signin"}
            className="bg-white hover:bg-gray-100 text-indigo-600 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg"
          >
            <span>Get Started - It's Free</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">PriceWatcher</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The smartest way to track product prices and get instant alerts when they drop. 
                Never miss a deal again.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PriceWatcher. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;