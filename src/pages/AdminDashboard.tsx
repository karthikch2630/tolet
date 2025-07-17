import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProperty } from '../context/PropertyContext';
import { useChat } from '../context/ChatContext';
import {
  UserGroupIcon,
  HomeIcon,
  ChatBubbleLeftIcon,
  ChartBarIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { properties, updateProperty } = useProperty();
  const { chats } = useChat();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center max-w-md">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this page</p>
        </div>
      </div>
    );
  }

  const totalUsers = 1250; // Mock data
  const totalRevenue = properties.reduce((sum, p) => sum + p.price, 0);
  const activeProperties = properties.filter(p => p.status === 'active').length;
  const pendingProperties = properties.filter(p => p.status === 'pending').length;

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers.toLocaleString(),
      icon: UserGroupIcon,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Active Properties',
      value: activeProperties,
      icon: HomeIcon,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Total Chats',
      value: chats.length,
      icon: ChatBubbleLeftIcon,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      title: 'Monthly Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: CurrencyRupeeIcon,
      color: 'bg-yellow-500',
      change: '+22%'
    }
  ];

  const handlePropertyStatusChange = (propertyId: number, status: string) => {
    updateProperty(propertyId, { status });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'properties', label: 'Properties', icon: HomeIcon },
    { id: 'users', label: 'Users', icon: UserGroupIcon },
    { id: 'chats', label: 'Messages', icon: ChatBubbleLeftIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your platform and monitor performance</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
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
                <h2 className="text-xl font-semibold text-gray-900">Platform Overview</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Properties */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Properties</h3>
                    <div className="space-y-3">
                      {properties.slice(0, 5).map((property) => (
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
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            property.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {property.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Platform Analytics */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Properties this month</span>
                        <span className="font-semibold text-gray-900">24</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">New users this week</span>
                        <span className="font-semibold text-gray-900">156</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Active chats</span>
                        <span className="font-semibold text-gray-900">{chats.length}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-600">Pending approvals</span>
                        <span className="font-semibold text-gray-900">{pendingProperties}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Manage Properties</h2>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {activeProperties} Active
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {pendingProperties} Pending
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Owner
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {properties.map((property) => (
                        <tr key={property.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={property.images[0]}
                                alt={property.title}
                                className="w-12 h-12 object-cover rounded-lg mr-4"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                <div className="text-sm text-gray-500 flex items-center">
                                  <MapPinIcon className="h-4 w-4 mr-1" />
                                  {property.location}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{property.owner.name}</div>
                            <div className="text-sm text-gray-500">{property.owner.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              ₹{property.price.toLocaleString()}/month
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              property.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {property.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handlePropertyStatusChange(property.id, 'active')}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircleIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handlePropertyStatusChange(property.id, 'inactive')}
                              className="text-red-600 hover:text-red-900"
                            >
                              <XCircleIcon className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">User Management</h2>
                <div className="text-center py-12">
                  <UserGroupIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
                  <p className="text-gray-600">User management features will be implemented here</p>
                </div>
              </div>
            )}

            {/* Chats Tab */}
            {activeTab === 'chats' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Platform Messages</h2>
                
                {chats.length === 0 ? (
                  <div className="text-center py-12">
                    <ChatBubbleLeftIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No messages</h3>
                    <p className="text-gray-600">Platform messages will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {chats.map((chat) => (
                      <div key={chat.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <ChatBubbleLeftIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">Chat #{chat.id}</h3>
                              <p className="text-sm text-gray-600">Property ID: {chat.propertyId}</p>
                              <p className="text-sm text-gray-600 truncate max-w-md">{chat.lastMessage}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(chat.lastActivity).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{chat.messages.length} messages</span>
                            {chat.unreadCount > 0 && (
                              <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                                {chat.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
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

export default AdminDashboard;