import Coversation from "../components/inbox/Conversation";

const InboxPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
      <h1 className="my-6 mb-6 text-2xl">My Inbox</h1>
      <Coversation />
      <Coversation />
      <Coversation />
    </main>
  );
};
export default InboxPage;
