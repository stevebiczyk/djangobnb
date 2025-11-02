"use client";

import { useRouter } from "next/navigation";
import { ConversationType } from "@/app/inbox/page";
import CustomButton from "../forms/CustomButton";

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}

const Coversation: React.FC<ConversationProps> = async ({
  conversation,
  userId,
}) => {
  const router = useRouter();
  const otherUser = conversation.participants.find(
    (participant) => participant.id !== userId
  );

  return (
    <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl">
      <p className="mb-6 text-xl">{otherUser?.name}</p>
      <p
        onClick={() => router.push(`/inbox/${conversation.id}`)}
        className="text-red-700"
      >
        Go to conversation
      </p>
    </div>
  );
};
export default Coversation;
