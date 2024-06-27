import { toast } from "@/components/ui/use-toast";
import { User } from "@/types/types";
import { create } from "zustand";

// export interface Friend {
//   id: string;
//   userOneId: string;
//   userTwoId: string;
//   isFriend: boolean;
// }

interface FriendState {
  friends: User[];

  setFriends: (friends: User[]) => void;
  confirmFriendsRequest: ({
    userOneId,
    userTwoId,
  }: {
    userOneId: string;
    userTwoId: string;
  }) => Promise<void>;
  unFriend: ({
    userOneId,
    userTwoId,
  }: {
    userOneId: string;
    userTwoId: string;
  }) => Promise<void>;
}

export const FriendLists = create<FriendState>((set) => ({
  friends: [],

  setFriends: (friends: User[]) => {
    set({ friends });
  },

  confirmFriendsRequest: async function ({ userOneId, userTwoId }) {
    const resp = await fetch("/api/user/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userOneId, userTwoId }),
    });
    if (!resp.ok) {
      const { messg } = await resp.json();
      toast({ title: messg, variant: "destructive" });
    } else {
      const { messg, user } = await resp.json();
      toast({ title: messg });
      set((state) => ({ friends: [...state.friends, user] }));
    }
  },

  unFriend: async function ({ userOneId, userTwoId }) {
    //userOneId is CurrentUser
    const resp = await fetch("/api/user/unfriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userOneId, userTwoId }),
    });
    if (!resp.ok) {
      const { messg } = await resp.json();
      toast({ title: messg, variant: "destructive" });
    } else {
      const { messg, user } = await resp.json();
      toast({ title: messg });
      set((state) => ({
        friends: state.friends.filter((item) => item.id !== user.id),
      }));
    }
  },
}));
