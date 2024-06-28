import { User } from "@/types/types";
import { Button } from "./ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import useAuthStore from "@/store/auth";
import { SentFriendRequest } from "@/store/sentFriendRequest";
import { RequestFriends } from "@/store/requestFriends";
import { FriendLists } from "@/store/friends";
import UnfriendDialog from "./unfriend-dialog";

export default function UserItem({ id, name, email }: User) {
  const { user } = useAuthStore();
  const { friends, confirmFriendsRequest, unFriend } = FriendLists();
  const { requestFriends, removeRequestFriend } = RequestFriends();
  const { sentFriendRequest, addFriendRequest, cancleFriendRequest } =
    SentFriendRequest();

  const isFriend = !!friends.find((item) => item.id === id);
  const receivedRequest = !!requestFriends.find((item) => item.id === id);
  const sentRequst = !!sentFriendRequest.find((item) => item.id === id);

  return (
    <div className="border border-border bg-background py-2 px-4 shadow-md rounded-md">
      <div className="ml-1 lg:text-xl mb-2">{name}</div>
      <div>
        {isFriend ? (
          <div className="flex items-center gap-x-2">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button size={"sm"} variant={"outline"}>
                  View
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <h1>email: {email}</h1>
                <h1>name: {name}</h1>
              </HoverCardContent>
            </HoverCard>

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
