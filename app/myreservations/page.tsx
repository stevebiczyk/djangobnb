"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import apiService from "../services/apiService";

type Reservation = {
  id: string;
  start_date: string;
  end_date: string;
  number_of_nights?: number;
  total_price?: number;
  property?: {
    id: string;
    title: string;
    image_url?: string;
    price?: number;
  };
};

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiService.get("/api/properties/reservations/mine/");
        // backend returns a plain array; fall back to .data if needed
        const list: Reservation[] = Array.isArray(res) ? res : res?.data ?? [];
        setReservations(list);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load reservations");
      }
    })();
  }, []);

  if (error) {
    return (
      <main className="max-w-[1500px] mx-auto px-6 pb-6">
        <h1 className="my-6 mb-6 text-2xl">My reservations</h1>
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  if (!reservations) {
    return (
      <main className="max-w-[1500px] mx-auto px-6 pb-6">
        <h1 className="my-6 mb-6 text-2xl">My reservations</h1>
        <p>Loading…</p>
      </main>
    );
  }

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 mb-6 text-2xl">My reservations</h1>

      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <div className="space-y-4">
          {reservations.map((r) => (
            <div
              key={r.id}
              className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl"
            >
              <div className="col-span-1">
                <div className="relative overflow-hidden aspect-square rounded-xl">
                  <Image
                    src={r.property?.image_url || "/beach_1.jpg"}
                    fill
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt={r.property?.title || "Property image"}
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-3 space-y-2">
                <h2 className="mb-4 text-lg">
                  {r.property?.title ?? "Property"}
                </h2>

                <p className="mb-2">
                  Check In Date: <strong>{r.start_date}</strong>
                </p>
                <p className="mb-2">
                  Check Out Date: <strong>{r.end_date}</strong>
                </p>
                {r.number_of_nights != null && (
                  <p className="mb-2">
                    Number of Nights: <strong>{r.number_of_nights}</strong>
                  </p>
                )}
                {r.total_price != null && (
                  <p className="mb-2">
                    Total Price: <strong>£{r.total_price}</strong>
                  </p>
                )}

                {r.property?.id && (
                  <Link
                    href={`/properties/${r.property.id}`}
                    className="mt-6 inline-block cursor-pointer py-3 px-5 bg-red-400 text-white rounded-xl"
                  >
                    Go to property
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

// import Image from "next/image";

// import apiService from "../services/apiService";

// const MyReservationsPage = async () => {
//   const reservations = await apiService.get(
//     "/api/properties/reservations/mine/"
//   );
//   return (
//     <main className="max-w-[1500px] mx-auto px-6 pb-6">
//       <h1 className="my-6 mb-6 text-2xl">My reservations</h1>
//       <div className="space-y-4">
//         {reservations.map((reservation: any) => {
//           return (
//             <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
//               <div className="col-span-1">
//                 <div className="relative overflow-hidden aspect-square rounded-xl">
//                   <Image
//                     src="/beach_1.jpg"
//                     fill
//                     className="hover:scale-110 object-cover transition h-full w-full"
//                     alt="Beach house"
//                   />
//                 </div>
//               </div>
//               <div className="col-span-1 md:col-span-3 space-y-2">
//                 <h2 className="mb-4 text-lg">Property Name</h2>
//                 <p className="mb-2">
//                   Check In Date:
//                   <strong>11/07/2025</strong>
//                 </p>
//                 <p className="mb-2">
//                   Check Out Date:
//                   <strong>13/07/2025</strong>
//                 </p>
//                 <p className="mb-2">
//                   Number of Nights:
//                   <strong>2</strong>
//                 </p>
//                 <p className="mb-2">
//                   Total Price:
//                   <strong>$200</strong>
//                 </p>
//                 <div className="mt-6 inline-block cursor-pointer py-4 px-6 bg-red-400 text-white rounded-xl">
//                   Go to property
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </main>
//   );
// };
// export default MyReservationsPage;
