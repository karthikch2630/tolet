import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockChats } from '../data/mockData';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

interface Chat {
  id: number;
  propertyId: number;
  ownerName: string;
  messages: Message[];
  lastMessage: string;
  lastActivity: string;
  unreadCount: number;
}

interface ChatContextType {
  chats: Chat[];
  activeChat: Chat | null;
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>;
  sendMessage: (chatId: number, message: string) => void;
  createChat: (propertyId: number, ownerName: string) => Chat;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const sendMessage = (chatId: number, message: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? {
            ...chat,
            messages: [...chat.messages, {
              id: Date.now(),
              text: message,
              sender: 'user',
              timestamp: new Date().toISOString()
            }],
            lastMessage: message,
            lastActivity: new Date().toISOString()
          }
        : chat
    ));
  };

  const createChat = (propertyId: number, ownerName: string): Chat => {
    const newChat: Chat = {
      id: Date.now(),
      propertyId,
      ownerName,
      messages: [],
      lastMessage: '',
      lastActivity: new Date().toISOString(),
      unreadCount: 0
    };
    setChats(prev => [newChat, ...prev]);
    return newChat;
  };

  const value = {
    chats,
    activeChat,
    setActiveChat,
    sendMessage,
    createChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};