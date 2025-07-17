import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import {
  HomeIcon,
  PhotoIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const PostProperty = () => {
  const navigate = useNavigate();
  const { addProperty } = useProperty();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'apartment',
    bedrooms: '1',
    bathrooms: '1',
    area: '',
    description: '',
    furnishing: 'Unfurnished',
    images: [''],
    amenities: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'studio', label: 'Studio' },
    { value: 'villa', label: 'Villa' }
  ];

  const furnishingOptions = [
    { value: 'Unfurnished', label: 'Unfurnished' },
    { value: 'Semi Furnished', label: 'Semi Furnished' },
    { value: 'Fully Furnished', label: 'Fully Furnished' }
  ];

  const amenitiesList = [
    'Parking', 'Gym', 'Swimming Pool', 'Security', 'Lift', 
    'Garden', 'Power Backup', 'Water Supply', 'Internet', 'AC'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, images: newImages }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.price || parseInt(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.area || parseInt(formData.area) <= 0) newErrors.area = 'Valid area is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.images.filter(img => img.trim()).length === 0) {
      newErrors.images = 'At least one image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (!validateForm()) return;

    const propertyData = {
      ...formData,
      price: parseInt(formData.price),
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      area: parseInt(formData.area),
      images: formData.images.filter(img => img.trim()),
      owner: {
        name: user.name,
        phone: user.phone || '+91 9876543210',
        email: user.email
      },
      available: true
    };

    const newProperty = addProperty(propertyData);
    navigate(`/property/${newProperty.id}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center max-w-md">
          <HomeIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">You need to login to post a property</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Your Property</h1>
            <p className="text-gray-600">Fill in the details to list your property for rent</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Luxury 2BHK Apartment in Bandra"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Bandra West, Mumbai"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {propertyTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Rent (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., 25000"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms
                  </label>
                  <select
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area (sq ft) *
                  </label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="e.g., 1200"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.area ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Furnishing Status
                </label>
                <select
                  name="furnishing"
                  value={formData.furnishing}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {furnishingOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Images</h2>
              <div className="space-y-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="Enter image URL"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Add Another Image</span>
                </button>
                {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {amenitiesList.map(amenity => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                placeholder="Describe your property in detail..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <HomeIcon className="h-5 w-5" />
                <span>Post Property</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostProperty;