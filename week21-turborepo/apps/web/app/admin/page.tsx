"use client";
import Admin from "@repo/ui/admin";
import { Button } from "@repo/ui/button";
import Input from "@repo/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminPage() {

  const router = useRouter();
  const [roomName, setRoomName] = useState("");

  return (
    <div>
      <h1>Chat app</h1>
      <Admin appName="web123" className="background-blue">
       qwerty 
      </Admin>
      <br /><br /><br /><br />
      <Input placeholder="Enter your Room name" size="small" onChange={(e) => setRoomName(e.target.value)}>
      </Input>
      <br />
      <button onClick={() => router.push(`/chat/${roomName}`)}>Join Room</button>
      <br /><br /><br /><br />
      <Button appName="web123">Alert me!</Button>
    </div>
  );
}