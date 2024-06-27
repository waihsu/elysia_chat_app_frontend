import { User } from "@/types/types";
import { Button } from "./ui/button";

import useAuthStore from "@/store/auth";
import { SentFriendRequest } from "@/store/sentFriendRequest";
import { RequestFriends } from "@/store/requestFriends";
import { FriendLists } from "@/store/friends";
import UnfriendDialog from "./unfriend-dialog";

export default function UserItem({ id, name }: User) {
  const { user } = useAuthStore();
  const { friends, confirmFriendsRequest, unFriend } = FriendLists();
  const { requestFriends, removeRequestFriend } = RequestFriends();
  const { sentFriendRequest, addFriendRequest, cancleFriendRequest } =
    SentFriendRequest();

  const isFriend = !!friends.find((item) => item.id === id);
  const receivedRequest = !!requestFriends.find((item) => item.id === id);
  const sentRequst = !!sentFriendRequest.find((item) => item.id === id);

  // Add Friend
  // async function addFriend() {
  //   const resp = await fetch("/api/user/addfriend", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userOneId: user?.id, userTwoId: id }),
  //   });
  //   if (!resp.ok) {
  //     const { messg } = await resp.json();
  //     toast({ title: messg, variant: "destructive" });
  //   } else {
  //     const data = await resp.json();
  //     toast({ title: data.messg });
  //   }
  // }

  // Cancle Friend Request
  // async function cancleFriendRequest() {
  //   const resp = await fetch("/api/user/cancle", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userOneId: user?.id, userTwoId: id }),
  //   });
  //   if (!resp.ok) {
  //     const { messg } = await resp.json();
  //     toast({ title: messg, variant: "destructive" });
  //   } else {
  //     const { messg, user } = await resp.json();
  //     toast({ title: messg });
  //   }
  // }

  // Accept Friend
  // async function confirmFriendRequest() {
  //   const resp = await fetch("/api/user/accept", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userOneId: id, userTwoId: user?.id }),
  //   });
  //   if (!resp.ok) {
  //     const { messg } = await resp.json();
  //     toast({ title: messg, variant: "destructive" });
  //   } else {
  //     const data = await resp.json();
  //     toast({ title: data.messg });
  //   }
  // }

  // Remove Friend Request
  // async function removeFriendRequest() {
  //   const resp = await fetch("/api/user/remove", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userOneId: id, userTwoId: user?.id }),
  //   });
  //   if (!resp.ok) {
  //     const { messg } = await resp.json();
  //     toast({ title: messg, variant: "destructive" });
  //   } else {
  //     const data = await resp.json();
  //     toast({ title: data.messg });
  //   }
  // }

  // unFriend
  // async function unFriend() {
  //   const resp = await fetch("/api/user/unfriend", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userOneId: user?.id, userTwoId: id }),
  //   });
  //   if (!resp.ok) {
  //     const { messg } = await resp.json();
  //     toast({ title: messg, variant: "destructive" });
  //   } else {
  //     const data = await resp.json();
  //     toast({ title: data.messg });
  //   }
  // }

  return (
    <div className="border border-border bg-background py-2 px-4 shadow-md rounded-md">
      <div className="ml-1 lg:text-xl mb-2">{name}</div>
      <div>
        {isFriend ? (
          <div className="flex items-center gap-x-2">
            <Button onClick={() => {}} size={"sm"} variant={"outline"}>
              View
            </Button>
            <UnfriendDialog
              button={
                <Button size={"sm"} variant={"destructive"}>
                  Unfriend
                </Button>
              }
              callback={() =>
                unFriend({ userOneId: String(user?.id), userTwoId: id })
              }
            />
          </div>
        ) : receivedRequest ? (
          <div className="flex items-center gap-x-2">
            <Button
              onClick={() =>
                confirmFriendsRequest({
                  userOneId: id,
                  userTwoId: String(user?.id),
                })
              }
              size={"sm"}
              variant={"outline"}
            >
              Confirm
            </Button>
            <Button
              onClick={() =>
                removeRequestFriend({
                  userOneId: id,
                  userTwoId: String(user?.id),
                })
              }
              size={"sm"}
              variant={"outline"}
            >
              Remove
            </Button>
          </div>
        ) : sentRequst ? (
          <Button
            onClick={() =>
              cancleFriendRequest({
                userOneId: String(user?.id),
                userTwoId: id,
              })
            }
            size={"sm"}
            variant={"outline"}
          >
            Cancle request
          </Button>
        ) : (
          <Button
            onClick={() =>
              addFriendRequest({ userOneId: String(user?.id), userTwoId: id })
            }
            size={"sm"}
            variant={"outline"}
          >
            Add Friend
          </Button>
        )}
      </div>
    </div>
  );
}
