import React, { useEffect } from "react";
import ChatLayout from "./chat-layout";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/auth";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ConversationsStore } from "@/store/conversations";

import { PhoneCall, Video } from "lucide-react";
import MediaRoom from "./media-room";

interface MessageState {
  id: string;
  text: string;
  users: { id: string; email: string; name: string };
}

const sendMessageSchema = z.object({
  userId: z.string(),
  text: z.string(),
});

export default function Messages() {
  const params = useParams();
  const { user } = useAuthStore();
  const { conversations } = ConversationsStore();
  const [messages, setMessages] = useState<MessageState[]>([]);
  const latestMessageRef = useRef<HTMLDivElement>(null);
  const loadRef = useRef<HTMLDivElement>(null);

  const [videoCall, setVideoCall] = useState(false);
  const [audioCall, setAudioCall] = useState(false);
  const [onCall, setOnCall] = useState(false);
  //socket
  const socket = new WebSocket(`ws://localhost:3000/api/messages/${params.id}`);
  // const [socket, setSocket] = useState<WebSocket | null>(null);

  const validConversationUsers = conversations
    .find((item) => item.id === params.id)
    ?.user_conversatin.map((user_c) => user_c.users);
  // console.log(validConversationUsers);

  const form = useForm<z.infer<typeof sendMessageSchema>>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      userId: user?.id,
      text: "",
    },
  });

  //getmessages
  useEffect(() => {
    getMessages();
  }, [params.id]);

  // socket messages
  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (ev) => {
      if (latestMessageRef.current) {
        latestMessageRef.current.scrollTop =
          latestMessageRef.current.scrollHeight;
      }
      // console.log(JSON.parse(ev.data));
      setMessages((pre) => [...pre, JSON.parse(ev.data)]);
      console.log("message");
    };
  }, [params.id]);

  // scroll view useEffect
  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollTop =
        latestMessageRef.current.scrollHeight;
    }
  }, [messages]);

  // useEffect(() => {
  //   const ws = new WebSocket(`ws://localhost:3000/api/messages/${params.id}`);
  //   ws.onopen = () => {
  //     console.log("connected");
  //   };
  //   ws.onmessage = (ev) => {
  //     // console.log(JSON.parse(ev.data));
  //     setMessages((pre) => [...pre, JSON.parse(ev.data)]);
  //     console.log("message");
  //   };
  //   ws.addEventListener("close", (event) => {
  //     console.log("The connection has been closed successfully.");
  //   });

  //   ws.onerror = (error) => {
  //     console.error("WebSocket error observed:", error);
  //   };
  //   setSocket(ws);
  //   if (latestMessageRef.current) {
  //     latestMessageRef.current.scrollTop =
  //       latestMessageRef.current.scrollHeight;
  //   }
  //   return () => {
  //     ws.close = () => {
  //       console.log("closed");
  //     };
  //   };
  // }, [params.id]);

  async function getMessages() {
    const resp = await fetch(`/api/messages/${params.id}`);
    // console.log(await resp.json());
    if (resp.ok) {
      const { messages } = await resp.json();
      setMessages(messages);
    }
  }

  async function onSubmit(values: z.infer<typeof sendMessageSchema>) {
    const resp = await fetch(`/api/messages/${params.id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    form.reset();
    if (resp.ok) {
      const { message } = await resp.json();
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      } else {
        console.log("WebSocket is not open. Queuing message.");
      }
    }
  }

  return (
    <ChatLayout>
      {!onCall ? (
        <div className=" max-h-svh h-full flex justify-between flex-col rounded-none ">
          <div className="flex flex-row items-center justify-start shadow-sm border dark:border-b-muted rounded-sm p-3">
            <div className="w-full flex  space-x-2 items-center ">
              <Link to={"/conversations"}>
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className=" backdrop-blur supports-[backdrop-filter]:bg-background/10"
                >
                  <ChevronLeftIcon className="text-primary" />
                </Button>
              </Link>

              {validConversationUsers &&
                validConversationUsers
                  .filter((item) => item.id !== user?.id)
                  .map((item) => (
                    <div className="flex items-center space-x-2" key={item.id}>
                      <div>
                        <Avatar>
                          <AvatarFallback>{item.name[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  ))}
            </div>
            <div className=" flex items-center gap-x-2">
              <Button
                size={"icon"}
                onClick={() => {
                  setAudioCall(true);
                  setOnCall(true);
                }}
              >
                <PhoneCall />
              </Button>
              <Button
                size={"icon"}
                onClick={() => {
                  setAudioCall(true);
                  setVideoCall(true);
                  setOnCall(true);
                }}
              >
                <Video />
              </Button>
            </div>
          </div>
          <div
            ref={latestMessageRef}
            className=" shadow-sm py-0  mb-6 flex flex-col space-y-3 overflow-y-scroll scrollbar-none  h-full px-2 "
          >
            <h1 ref={loadRef}>hello</h1>
            {messages.map((message, index) => (
              <div key={index} className=" flex space-x-1 ">
                {message.users.id !== user?.id ? (
                  <Avatar>
                    <AvatarFallback>{message.users.name[0]}</AvatarFallback>
                  </Avatar>
                ) : (
                  ""
                )}

                <div
                  className={cn(
                    "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-blue-300",
                    message.users.id === user?.id
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 pb-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full items-center space-x-2"
              >
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className=" w-full">
                      <FormControl>
                        <Input
                          id="message"
                          placeholder="Type your message..."
                          className="flex-1 text-muted-foreground"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!form.formState.isDirty}
                >
                  <PaperPlaneIcon className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        <MediaRoom
          chatId={String(params.id)}
          audio={audioCall}
          video={videoCall}
          setOnCall={setOnCall}
          setVideoCall={setVideoCall}
        />
      )}
    </ChatLayout>
  );
}
