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
  addFriendLists: (user: User) => void;
  removeFriendList: (user: User) => void;
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
  addFriendLists: (user) => {
    set((state) => ({ friends: [...state.friends, user] }));
  },
  removeFriendList: (user) => {
    set((state) => ({
      friends: state.friends.filter((item) => item.id !== user.id),
    }));
  },
  confirmFriendsRequest: async function ({ userOneId, userTwoId }) {
    const socket = new WebSocket(
      `ws://localhost:3000/api/user/friends/${userOneId}`
    );
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
      if (user) {
        socket.send(
          JSON.stringify({ type: "acceptFriend", user: user.userTwo })
        );
        set((state) => ({ friends: [...state.friends, user.userOne] }));
      }
    }
  },

  unFriend: async function ({ userOneId, userTwoId }) {
    //userOneId is CurrentUser
    const socket = new WebSocket(
      `ws://localhost:3000/api/user/friends/${userTwoId}`
    );
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
      if (user) {
        socket.send(JSON.stringify({ type: "unfriend", user: user.userOne }));
        set((state) => ({
          friends: state.friends.filter((item) => item.id !== user.userTwo.id),
        }));
      }
    }
  },
}));
