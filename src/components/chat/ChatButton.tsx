import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatRoom } from './ChatRoom';
import { useChatStore } from '../../store/chatStore';
import { useAuthStore } from '../../store/authStore';

interface ChatButtonProps {
  requestId: string;
  otherUserId: string;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ requestId, otherUserId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthStore();
  const { getMessages, addMessage } = useChatStore();
  
  const messages = getMessages(requestId);

  const handleSendMessage = (content: string) => {
    if (!user) return;
    
    addMessage({
      id: Date.now().toString(),
      requestId,
      senderId: user.id,
      receiverId: otherUserId,
      content,
      read: false,
      createdAt: new Date(),
    });
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-lime-600 hover:text-lime-700"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Chat</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-lg h-[600px] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Chat</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="flex-1">
              <ChatRoom
                messages={messages}
                onSendMessage={handleSendMessage}
                currentUserId={user.id}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};