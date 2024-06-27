import React from "react";

export function ConnectionState({ isConnected }: { isConnected: boolean }) {
  return (
    <>
      {isConnected ? (
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 100,
            background: "green",
          }}
        />
      ) : (
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 100,
            background: "gray",
          }}
        />
      )}
    </>
  );
}
