import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockProperties } from '../data/mockData';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  amenities: string[];
  description: string;
  owner: {
    name: string;
    phone: string;
    email: string;
  };
  available: boolean;
  furnishing: string;
  createdAt: string;
  status: string;
}

interface Filters {
  location: string;
  type: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  amenities: string[];
}

interface PropertyContextType {
  properties: Property[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'status'>) => Property;
  updateProperty: (id: number, updates: Partial<Property>) => void;
  deleteProperty: (id: number) => void;
  getFilteredProperties: () => Property[];
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

interface PropertyProviderProps {
  children: ReactNode;
}

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [filters, setFilters] = useState<Filters>({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    amenities: []
  });
  const [searchQuery, setSearchQuery] = useState('');

  const addProperty = (property: Omit<Property, 'id' | 'createdAt' | 'status'>): Property => {
    const newProperty: Property = {
      ...property,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    setProperties(prev => [newProperty, ...prev]);
    return newProperty;
  };

  const updateProperty = (id: number, updates: Partial<Property>) => {
    setProperties(prev => prev.map(prop => 
      prop.id === id ? { ...prop, ...updates } : prop
    ));
  };

  const deleteProperty = (id: number) => {
    setProperties(prev => prev.filter(prop => prop.id !== id));
  };

  const getFilteredProperties = (): Property[] => {
    return properties.filter(property => {
      const matchesSearch = searchQuery === '' || 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = filters.location === '' || 
        property.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const matchesType = filters.type === '' || property.type === filters.type;
      
      const matchesPrice = (filters.minPrice === '' || property.price >= parseInt(filters.minPrice)) &&
        (filters.maxPrice === '' || property.price <= parseInt(filters.maxPrice));
      
      const matchesBedrooms = filters.bedrooms === '' || 
        property.bedrooms === parseInt(filters.bedrooms);
      
      const matchesAmenities = filters.amenities.length === 0 ||
        filters.amenities.every(amenity => property.amenities.includes(amenity));
      
      return matchesSearch && matchesLocation && matchesType && matchesPrice && 
             matchesBedrooms && matchesAmenities;
    });
  };

  const value = {
    properties,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    addProperty,
    updateProperty,
    deleteProperty,
    getFilteredProperties
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};