import useAuthStore from "@/store/auth";
import { ConversationType, ConversationsStore } from "@/store/conversations";
import { FriendLists } from "@/store/friends";
import { useActive } from "@/store/onlineUserStore";

import { RequestFriends } from "@/store/requestFriends";
import { SentFriendRequest } from "@/store/sentFriendRequest";

import { User } from "@/types/types";
import React, { useEffect } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  const { set } = useActive();
  const { setFriends } = FriendLists();
  const { setRequestFriend } = RequestFriends();
  const { setSentFrequest } = SentFriendRequest();
  const { setConversations } = ConversationsStore();
  const socket = new WebSocket(
    `ws://localhost:3000/api/onlineusers/${user?.id}`
  );
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchData(user.id);
    }
  }, []);

  useEffect(() => {
    socket.onopen = () => {
      socket.send("connected");
    };

    socket.onclose = () => {};
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    socket.onmessage = (ev) => {
      const userIds = JSON.parse(ev.data);
      set(userIds);
    };
  }, []);

  async function fetchData(userId: string) {
    const resp = await fetch(`/api/app/${userId}`);
    const {
      friends,
      requestFriends,
      sentFriendRequest,
      conversations,
    }: {
      friends: User[];
      requestFriends: User[];
      sentFriendRequest: User[];
      conversations: ConversationType[];
    } = await resp.json();
    setFriends(friends);
    setRequestFriend(requestFriends);
    setSentFrequest(sentFriendRequest);
    setConversations(conversations);
  }

  return <div>{children}</div>;
}
