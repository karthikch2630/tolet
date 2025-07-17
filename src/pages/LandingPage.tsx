import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import { 
  MagnifyingGlassIcon, 
  HomeIcon, 
  BuildingOfficeIcon, 
  MapPinIcon,
  StarIcon,
  CheckCircleIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const { setSearchQuery: setGlobalSearchQuery, setFilters } = useProperty();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalSearchQuery(searchQuery);
    if (selectedCity) {
      setFilters(prev => ({ ...prev, location: selectedCity }));
    }
    navigate('/properties');
  };

  const cities = [
    { name: 'Mumbai', properties: 1250, image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Delhi', properties: 980, image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Bangalore', properties: 850, image: 'https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Pune', properties: 620, image: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Chennai', properties: 540, image: 'https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { name: 'Hyderabad', properties: 480, image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ];

  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Verified Properties',
      description: 'All properties are verified by our team for authenticity and quality'
    },
    {
      icon: UserGroupIcon,
      title: 'Direct Owner Contact',
      description: 'Connect directly with property owners without any middleman'
    },
    {
      icon: ClockIcon,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your queries'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Properties Listed' },
    { number: '25,000+', label: 'Happy Customers' },
    { number: '100+', label: 'Cities Covered' },
    { number: '4.8/5', label: 'Customer Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Find Your Perfect
              <span className="block text-yellow-400">Rental Home</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-fade-in">
              Discover thousands of verified rental properties across India. No brokerage, direct owner contact.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-12 animate-slide-up">
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Select City</option>
                      {cities.map(city => (
                        <option key={city.name} value={city.name}>{city.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by locality, landmark..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Link
                to="/properties"
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center space-x-2 hover-scale"
              >
                <HomeIcon className="h-5 w-5" />
                <span>Find a Home</span>
              </Link>
              <Link
                to="/post-property"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2 hover-scale"
              >
                <BuildingOfficeIcon className="h-5 w-5" />
                <span>Post Property</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Tolet4me?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make property rental simple, transparent, and hassle-free for both tenants and owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center hover-scale">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Properties by City
            </h2>
            <p className="text-xl text-gray-600">
              Find rental properties in India's top cities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cities.map((city, index) => (
              <Link
                key={index}
                to={`/properties?city=${city.name}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover-scale"
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                  <p className="text-blue-200">{city.properties}+ Properties</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect rental property with Tolet4me.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 hover-scale"
            >
              Get Started Today
            </Link>
            <Link
              to="/properties"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 hover-scale"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;