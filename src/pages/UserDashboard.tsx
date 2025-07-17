import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext';
import { useChat } from '../context/ChatContext';
import {
  HomeIcon,
  PlusIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MapPinIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  UserIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const UserDashboard = () => {
  const { user } = useAuth();
  const { properties, deleteProperty } = useProperty();
  const { chats } = useChat();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center max-w-md">
          <UserIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">You need to login to access your dashboard</p>
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  const userProperties = properties.filter(p => p.owner.email === user.email);
  const userChats = chats.filter(c => userProperties.some(p => p.id === c.propertyId));

  const stats = [
    {
      title: 'Total Properties',
      value: userProperties.length,
      icon: HomeIcon,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Chats',
      value: userChats.length,
      icon: ChatBubbleLeftIcon,
      color: 'bg-green-500'
    },
    {
      title: 'Total Views',
      value: userProperties.length * 45, // Mock data
      icon: EyeIcon,
      color: 'bg-purple-500'
    },
    {
      title: 'This Month',
      value: `₹${userProperties.reduce((sum, p) => sum + p.price, 0).toLocaleString()}`,
      icon: CurrencyRupeeIcon,
      color: 'bg-yellow-500'
    }
  ];

  const handleDeleteProperty = (propertyId: number) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      deleteProperty(propertyId);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'properties', label: 'My Properties', icon: HomeIcon },
    { id: 'chats', label: 'Messages', icon: ChatBubbleLeftIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Manage your properties and track your rental business</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Dashboard Overview</h2>
                  <Link
                    to="/post-property"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <PlusIcon className="h-5 w-5" />
                    <span>Add Property</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Properties */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Properties</h3>
                    <div className="space-y-3">
                      {userProperties.slice(0, 3).map((property) => (
                        <div key={property.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{property.title}</h4>
                            <p className="text-sm text-gray-600">{property.location}</p>
                            <p className="text-sm font-medium text-blue-600">₹{property.price.toLocaleString()}/month</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Messages */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Messages</h3>
                    <div className="space-y-3">
                      {userChats.slice(0, 3).map((chat) => (
                        <div key={chat.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <UserIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{chat.ownerName}</h4>
                            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(chat.lastActivity).toLocaleDateString()}
                            </p>
                          </div>
                          {chat.unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {chat.unreadCount}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Properties</h2>
                  <Link
                    to="/post-property"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <PlusIcon className="h-5 w-5" />
                    <span>Add Property</span>
                  </Link>
                </div>

                {userProperties.length === 0 ? (
                  <div className="text-center py-12">
                    <HomeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No properties yet</h3>
                    <p className="text-gray-600 mb-4">Start by posting your first property</p>
                    <Link
                      to="/post-property"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Post Property
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userProperties.map((property) => (
                      <div key={property.id} className="bg-gray-50 rounded-xl overflow-hidden">
                        <div className="relative">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 right-3 bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                            Active
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
                          
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          
                          <div className="flex items-center text-blue-600 mb-4">
                            <CurrencyRupeeIcon className="h-5 w-5" />
                            <span className="text-xl font-bold">{property.price.toLocaleString()}</span>
                            <span className="text-gray-600 ml-1">/month</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-4">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span>Listed on {new Date(property.createdAt).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Link
                              to={`/property/${property.id}`}
                              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center text-sm flex items-center justify-center space-x-1"
                            >
                              <EyeIcon className="h-4 w-4" />
                              <span>View</span>
                            </Link>
                            <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm flex items-center justify-center space-x-1">
                              <PencilIcon className="h-4 w-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProperty(property.id)}
                              className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm flex items-center justify-center space-x-1"
                            >
                              <TrashIcon className="h-4 w-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Chats Tab */}
            {activeTab === 'chats' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Messages</h2>
                
                {userChats.length === 0 ? (
                  <div className="text-center py-12">
                    <ChatBubbleLeftIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                    <p className="text-gray-600">Messages from interested tenants will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userChats.map((chat) => (
                      <Link
                        key={chat.id}
                        to="/chat"
                        className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <UserIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{chat.ownerName}</h3>
                              <p className="text-sm text-gray-600 truncate max-w-md">{chat.lastMessage}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(chat.lastActivity).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {chat.unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                              {chat.unreadCount}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;