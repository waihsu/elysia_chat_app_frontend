import { toast } from "@/components/ui/use-toast";
import { User } from "@/types/types";
import { create } from "zustand";

interface SentFriendRequestState {
  sentFriendRequest: User[];
  setSentFrequest: (friends: User[]) => void;
  removeSentRequest: (user: User) => void;
  addFriendRequest: ({
    userOneId,
    userTwoId,
  }: {
    userOneId: string;
    userTwoId: string;
  }) => Promise<void>;
  cancleFriendRequest: ({
    userOneId,
    userTwoId,
  }: {
    userOneId: string;
    userTwoId: string;
  }) => Promise<void>;
}

export const SentFriendRequest = create<SentFriendRequestState>((set) => ({
  sentFriendRequest: [],

  setSentFrequest: (friends: User[]) => {
    set({ sentFriendRequest: friends });
  },
  removeSentRequest: (user) => {
    set((state) => ({
      sentFriendRequest: state.sentFriendRequest.filter(
        (item) => item.id !== user.id
      ),
    }));
  },
  addFriendRequest: async function ({
    userOneId,
    userTwoId,
  }: {
    userOneId: string;
    userTwoId: string;
  }) {
    const socket = new WebSocket(
      `ws://localhost:3000/api/user/friends/${userTwoId}`
    );
    const resp = await fetch("/api/user/addfriend", {
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
        socket.send(JSON.stringify({ type: "addfriend", user: user.userOne }));
        set((state) => ({
          sentFriendRequest: [...state.sentFriendRequest, user.userTwo],
        }));
      }
    }
  },
  cancleFriendRequest: async function ({
    userOneId,
    userTwoId,
  }: {
    userOneId: string;
    userTwoId: string;
  }) {
    const socket = new WebSocket(
      `ws://localhost:3000/api/user/friends/${userTwoId}`
    );
    const resp = await fetch("/api/user/cancle", {
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
      socket.send(JSON.stringify({ type: "canclefriend", user: user.userOne }));
      set((state) => ({
        sentFriendRequest: state.sentFriendRequest.filter(
          (item) => item.id !== user.userTwo.id
        ),
      }));
    }
  },
}));
