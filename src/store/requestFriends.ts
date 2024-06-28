// import { toast } from "@/components/ui/use-toast";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/types/types";
import { create } from "zustand";

interface RequestFriendsState {
  requestFriends: User[];
  setRequestFriend: (friends: User[]) => void;
  addedRequest: (user: User) => void;
  removeRequest: (user: User) => void;
  removeRequestFriend: ({
    userOneId,
    userTwoId,
  }: {
    userOneId: string;
    userTwoId: string;
  }) => Promise<void>;
}

export const RequestFriends = create<RequestFriendsState>((set) => ({
  requestFriends: [],

  setRequestFriend: (friends: User[]) => {
    set({ requestFriends: friends });
  },
  addedRequest: (user) => {
    set((state) => ({ requestFriends: [...state.requestFriends, user] }));
  },
  removeRequest: (user) => {
    set((state) => ({
      requestFriends: state.requestFriends.filter(
        (item) => item.id !== user.id
      ),
    }));
  },
  removeRequestFriend: async function ({ userOneId, userTwoId }) {
    const socket = new WebSocket(
      `ws://localhost:3000/api/user/friends/${userOneId}`
    );
    const resp = await fetch("/api/user/remove", {
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
          JSON.stringify({ type: "removeFriendrequest", user: user.userTwo })
        );
        set((state) => ({
          requestFriends: state.requestFriends.filter(
            (item) => item.id !== user.userOne.id
          ),
        }));
      }
    }
  },
}));
