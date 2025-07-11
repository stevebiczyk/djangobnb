import Image from "next/image";

const MyReservationsPage = () => {
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 mb-6 text-2xl">My reservations</h1>
      <div className="space-y-4">
        <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
          <div className="col-span-1">
            <div className="relative overflow-hidden aspect-square rounded-xl">
              <Image
                src="/beach_1.jpg"
                fill
                className="hover:scale-110 object-cover transition h-full w-full"
                alt="Beach house"
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 space-y-2">
            <h2 className="mb-4 text-lg">Property Name</h2>
            <p className="mb-2">
              Check In Date:
              <strong>11/07/2025</strong>
            </p>
            <p className="mb-2">
              Check Out Date:
              <strong>13/07/2025</strong>
            </p>
            <p className="mb-2">
              Number of Nights:
              <strong>2</strong>
            </p>
            <p className="mb-2">
              Total Price:
              <strong>$200</strong>
            </p>
            <div className="mt-6 inline-block cursor-pointer py-4 px-6 bg-red-400 text-white rounded-xl">
              Go to property
            </div>
          </div>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
          <div className="col-span-1">
            <div className="relative overflow-hidden aspect-square rounded-xl">
              <Image
                src="/beach_1.jpg"
                fill
                className="hover:scale-110 object-cover transition h-full w-full"
                alt="Beach house"
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 space-y-2">
            <h2 className="mb-4 text-lg">Property Name</h2>
            <p className="mb-2">
              Check In Date:
              <strong>11/07/2025</strong>
            </p>
            <p className="mb-2">
              Check Out Date:
              <strong>13/07/2025</strong>
            </p>
            <p className="mb-2">
              Number of Nights:
              <strong>2</strong>
            </p>
            <p className="mb-2">
              Total Price:
              <strong>$200</strong>
            </p>
            <div className="mt-6 inline-block cursor-pointer py-4 px-6 bg-red-400 text-white rounded-xl">
              Go to property
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default MyReservationsPage;
