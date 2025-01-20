import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, ChatRoom } from '../types/chat';

interface ChatState {
  chatRooms: ChatRoom[];
  messages: Message[];
  addMessage: (message: Message) => void;
  getChatRoom: (requestId: string) => ChatRoom | undefined;
  getMessages: (requestId: string) => Message[];
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chatRooms: [],
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      getChatRoom: (requestId) => {
        return get().chatRooms.find((room) => room.requestId === requestId);
      },
      getMessages: (requestId) => {
        return get().messages.filter((message) => message.requestId === requestId);
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);