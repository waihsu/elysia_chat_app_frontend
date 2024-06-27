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
  setConversations: (conversations: ConversationType[]) => void;
}

export const ConversationsStore = create<ConversationState>((set) => ({
  conversations: [],
  setConversations: (conversations: ConversationType[]) => {
    set({ conversations });
  },
}));
