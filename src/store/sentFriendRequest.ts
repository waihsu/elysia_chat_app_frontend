import { toast } from "@/components/ui/use-toast";
import { User } from "@/types/types";
import { create } from "zustand";

interface SentFriendRequestState {
  sentFriendRequest: User[];
  setSentFrequest: (friends: User[]) => void;
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
  addFriendRequest: async function ({
    userOneId,
    userTwoId,
  }: {
    userOneId: string;
    userTwoId: string;
  }) {
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
        set((state) => ({
          sentFriendRequest: [...state.sentFriendRequest, user],
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
      set((state) => ({
        sentFriendRequest: state.sentFriendRequest.filter(
          (item) => item.id !== user.id
        ),
      }));
    }
  },
}));
