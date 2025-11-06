import { getUserId } from "@/app/lib/actions";
import React, { useState, useEffect } from "react";
import apiService from "@/app/services/apiService";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { User } from "@clerk/nextjs/server";
import { UserType } from "../page";

export type MessageType = {
  id: string;
  name: string;
  body: string;
  conversationId: string;
  recipient: UserType;
  created_by: UserType;
};

const ConversationPage = async ({ params }: { params: { id: string } }) => {
  const userId = await getUserId();
  if (!userId) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
        <p>You need to be authenticated...</p>
      </main>
    );
  }

  const conversation = await apiService.get(`/api/chat/${params.id}/`);

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <ConversationDetail conversation={conversation} userId={userId} />
    </main>
  );
};
export default ConversationPage;
