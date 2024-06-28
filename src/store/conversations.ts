import { create } from "zustand";

export interface ConversationType {
  id: string;
  name: string | null;
  isGroup: boolean;
  user_conversatin: {
    users: {
      id: string;
      name: string;
      email: string;
    };
  }[];
}
[];
interface ConversationState {
  conversations: ConversationType[];
  removeConversation: (id: string) => void;
  setConversations: (conversations: ConversationType[]) => void;
}

export const ConversationsStore = create<ConversationState>((set) => ({
  conversations: [],
  removeConversation: (id) => {
    set((state) => ({
      conversations: state.conversations.filter((item) => item.id !== id),
    }));
  },
  setConversations: (conversations: ConversationType[]) => {
    set({ conversations });
  },
}));
