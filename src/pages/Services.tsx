import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockServices } from '../data/mockData';
import {
  WrenchScrewdriverIcon,
  StarIcon,
  PhoneIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';

const Services = () => {
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [bookingForm, setBookingForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleBookService = (service: any) => {
    setSelectedService(service);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    alert(`Booking confirmed for ${selectedService.name}!`);
    setSelectedService(null);
    setBookingForm({
      name: user?.name || '',
      phone: user?.phone || '',
      address: '',
      date: '',
      time: '',
      notes: ''
    });
  };

  const features = [
    {
      icon: ShieldCheckIcon,
      title: 'Verified Professionals',
      description: 'All service providers are background verified and trained'
    },
    {
      icon: CurrencyRupeeIcon,
      title: 'Transparent Pricing',
      description: 'No hidden charges, pay only for what you book'
    },
    {
      icon: ClockIcon,
      title: 'On-Time Service',
      description: 'Guaranteed on-time arrival or we compensate you'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Home Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional home services to make your move-in experience seamless and hassle-free
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mockServices.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="flex items-center justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(service.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({service.rating})</span>
                </div>
                
                <div className="text-2xl font-bold text-blue-600 mb-4">{service.price}</div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-medium text-gray-900">Service Providers:</h4>
                {service.providers.map((provider, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">{provider}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleBookService(service)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* How it Works */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Choose Service', description: 'Select the service you need from our catalog' },
              { step: '2', title: 'Book Online', description: 'Fill in your details and preferred time slot' },
              { step: '3', title: 'Professional Arrives', description: 'Verified professional arrives at your location' },
              { step: '4', title: 'Service Complete', description: 'Pay after service completion and rate your experience' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Book {selectedService.name}</h3>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={bookingForm.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={bookingForm.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={bookingForm.time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Notes</label>
                  <textarea
                    name="notes"
                    value={bookingForm.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Any special requirements or notes..."
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">Service Cost:</span>
                    <span className="text-xl font-bold text-blue-600">{selectedService.price}</span>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;