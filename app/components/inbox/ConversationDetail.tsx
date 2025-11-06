"use client";

import CustomButton from "../forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";

interface ConversationDetailProps {
  conversation: ConversationType;
  userId: string;
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  conversation,
  userId,
}) => {
  const myUser = conversation.participants.find(
    (participant) => participant.id === userId
  );
  const otherUser = conversation.participants.find(
    (participant) => participant.id !== userId
  );

  return (
    <>
      <div className="max-h-[400px] overflow-auto flex flex-col space-y-4">
        <div className="w-[80%] py-4 px-6 rounded-xl bg-gray-200">
          <p className="font-bold text-gray-800">John Doe</p>
          <p className="text-gray-600">Hello! How are you?</p>
        </div>
        <div className="w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-blue-200">
          <p className="font-bold text-gray-800">John Doe</p>
          <p className="text-gray-600">Hello! How are you?</p>
        </div>
      </div>
      <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 bg-gray-200 rounded-xl"
        />
        <CustomButton
          label="Send..."
          onClick={() => console.log("Button Clicked")}
          className="w-[100px]"
        />
      </div>
    </>
  );
};
export default ConversationDetail;
