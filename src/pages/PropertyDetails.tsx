import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import {
  MapPinIcon,
  CurrencyRupeeIcon,
  HomeModernIcon,
  SquaresPlusIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  ShareIcon,
  CheckCircleIcon,
  CalendarIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { properties } = useProperty();
  const { createChat } = useChat();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const property = properties.find(p => p.id === parseInt(id || '0'));

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h2>
          <Link to="/properties" className="text-blue-600 hover:text-blue-700">
            Back to listings
          </Link>
        </div>
      </div>
    );
  }

  const handleStartChat = () => {
    if (user) {
      createChat(property.id, property.owner.name);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-blue-600">Properties</Link>
            <span>/</span>
            <span className="text-gray-900">{property.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="relative">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
                    <HeartIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
                    <ShareIcon className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {property.images.length > 1 && (
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                          currentImageIndex === index ? 'border-blue-600' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-blue-600 mb-2">
                    <CurrencyRupeeIcon className="h-6 w-6" />
                    <span className="text-3xl font-bold">{property.price.toLocaleString()}</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                  <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Available
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <HomeModernIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <SquaresPlusIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <SquaresPlusIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">{property.area}</div>
                  <div className="text-sm text-gray-600">Sq Ft</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <UserIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-semibold text-gray-900">{property.furnishing}</div>
                  <div className="text-sm text-gray-600">Furnishing</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Owner Contact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{property.owner.name}</h3>
                <p className="text-gray-600">Property Owner</p>
              </div>

              <div className="space-y-3 mb-6">
                {user ? (
                  <>
                    <button
                      onClick={() => setShowContactInfo(!showContactInfo)}
                      className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <PhoneIcon className="h-5 w-5" />
                      <span>Show Contact</span>
                    </button>
                    
                    {showContactInfo && (
                      <div className="space-y-2 animate-slide-up">
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                          <PhoneIcon className="h-5 w-5 text-gray-600" />
                          <span className="text-gray-900">{property.owner.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                          <EnvelopeIcon className="h-5 w-5 text-gray-600" />
                          <span className="text-gray-900">{property.owner.email}</span>
                        </div>
                      </div>
                    )}

                    <Link
                      to="/chat"
                      onClick={handleStartChat}
                      className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      <ChatBubbleLeftIcon className="h-5 w-5" />
                      <span>Start Chat</span>
                    </Link>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">Login to contact the owner</p>
                    <Link
                      to="/login"
                      className="w-full block bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
                    >
                      Login Now
                    </Link>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>Listed on {new Date(property.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/services"
                  className="w-full flex items-center justify-center space-x-2 bg-yellow-400 text-gray-900 py-3 rounded-lg hover:bg-yellow-300 transition-colors duration-200"
                >
                  <span>Book Services</span>
                </Link>
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <span>Schedule Visit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;