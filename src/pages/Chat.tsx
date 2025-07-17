import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import {
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  UserIcon,
  PhoneIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

const Chat = () => {
  const { chats, activeChat, setActiveChat, sendMessage } = useChat();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && activeChat) {
      sendMessage(activeChat.id, newMessage.trim());
      setNewMessage('');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center max-w-md">
          <ChatBubbleLeftIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">You need to login to access chat</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Chat List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {chats.length === 0 ? (
                  <div className="p-6 text-center">
                    <ChatBubbleLeftIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No conversations yet</p>
                  </div>
                ) : (
                  <div className="space-y-1 p-4">
                    {chats.map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => setActiveChat(chat)}
                        className={`w-full text-left p-4 rounded-lg transition-colors duration-200 ${
                          activeChat?.id === chat.id
                            ? 'bg-blue-50 border-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <UserIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">{chat.ownerName}</h3>
                            <p className="text-sm text-gray-600 truncate">{chat.lastMessage || 'No messages yet'}</p>
                            <p className="text-xs text-gray-500">
                              {chat.lastActivity ? new Date(chat.lastActivity).toLocaleDateString() : ''}
                            </p>
                          </div>
                          {chat.unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              {chat.unreadCount}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{activeChat.ownerName}</h3>
                        <p className="text-sm text-gray-600">Property Owner</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <PhoneIcon className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                        <VideoCameraIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {activeChat.messages.length === 0 ? (
                      <div className="text-center py-8">
                        <ChatBubbleLeftIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Start a conversation</p>
                      </div>
                    ) : (
                      activeChat.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg chat-bubble ${
                              message.sender === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {new Date(message.timestamp).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-6 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex space-x-4">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                      >
                        <PaperAirplaneIcon className="h-5 w-5" />
                        <span>Send</span>
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <ChatBubbleLeftIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a chat from the sidebar to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;