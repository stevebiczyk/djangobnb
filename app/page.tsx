import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">DjangoBNB</h1>
        <p className="text-lg text-gray-600">
          A simple Django application for managing bookings and listings.
        </p>
        <Image
          src="/images/djangobnb-logo.png"
          alt="DjangoBNB Logo"
          width={200}
          height={200}
        />
        <p className="text-lg text-gray-600">
          Welcome to DjangoBNB, your go-to platform for booking and managing
          accommodations. Explore our listings, manage your bookings, and enjoy
          a seamless experience.
        </p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
