import "@livekit/components-styles";
import {
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  VideoConference,
  useTracks,
  LeaveIcon,
} from "@livekit/components-react";
import useAuthStore from "@/store/auth";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Track } from "livekit-client";
import { Button } from "./ui/button";

interface MediaRoomProps {
  chatId: string;
  video: boolean;
  audio: boolean;
  setOnCall: (value: boolean) => void;
}

export default function MediaRoom({
  chatId,
  video,
  audio,
  setOnCall,
}: MediaRoomProps) {
  const { user } = useAuthStore();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!user) return;

    const getToken = async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${user.name}`
        );
        const { token } = await resp.json();
        setToken(token);
      } catch (err) {
        console.log(err);
      }
    };
    getToken();
  }, [user, chatId]);

  if (!token) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={import.meta.env.VITE_LIVE_KIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}
      className="relative aspect-video"
    >
      <VideoConference />

      {/* <MyVideoConference /> */}
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      {/* <ControlBar /> */}

      <Button
        size={"icon"}
        className="absolute top-0"
        onClick={() => setOnCall(false)}
      >
        <LeaveIcon />
      </Button>
    </LiveKitRoom>
  );
}

export function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: true }
  );
  return (
    <GridLayout tracks={tracks}>
      {/* The GridLayout accepts zero or one child. The child is used
        as a template to render all passed in tracks. */}

      <ParticipantTile />
    </GridLayout>
  );
}
