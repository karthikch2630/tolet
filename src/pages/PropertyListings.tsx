import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  MapPinIcon,
  HomeIcon,
  BuildingOfficeIcon,
  CurrencyRupeeIcon,
  HomeModernIcon,
  SquaresPlusIcon,
  HeartIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const PropertyListings = () => {
  const { getFilteredProperties, filters, setFilters, searchQuery, setSearchQuery } = useProperty();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  
  const properties = getFilteredProperties();

  const propertyTypes = ['apartment', 'house', 'studio', 'villa'];
  const amenitiesList = ['Parking', 'Gym', 'Swimming Pool', 'Security', 'Lift', 'Garden', 'Power Backup'];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      amenities: []
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Home</h1>
          <p className="text-gray-600">Discover {properties.length} properties available for rent</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location, property name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent search-input"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-6 animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                  <input
                    type="number"
                    placeholder="Min price"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                  <input
                    type="number"
                    placeholder="Max price"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map(amenity => (
                    <button
                      key={amenity}
                      onClick={() => handleAmenityToggle(amenity)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 filter-chip ${
                        filters.amenities.includes(amenity)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={clearFilters}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Link
              key={property.id}
              to={`/property/${property.id}`}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden property-card"
            >
              <div className="relative">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
                  <HeartIcon className="h-5 w-5 text-gray-600" />
                </button>
                <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                  {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {property.title}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-blue-600">
                    <CurrencyRupeeIcon className="h-5 w-5" />
                    <span className="text-xl font-bold">{property.price.toLocaleString()}</span>
                    <span className="text-gray-600 ml-1">/month</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <HomeModernIcon className="h-4 w-4 mr-1" />
                    <span>{property.bedrooms} Bed</span>
                  </div>
                  <div className="flex items-center">
                    <HomeIcon className="h-4 w-4 mr-1" />
                    <span>{property.bathrooms} Bath</span>
                  </div>
                  <div className="flex items-center">
                    <SquaresPlusIcon className="h-4 w-4 mr-1" />
                    <span>{property.area} sqft</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{property.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <HomeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListings;