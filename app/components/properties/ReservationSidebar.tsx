"use client";

import { useState, useEffect } from "react";
import { Range } from "react-date-range";
import apiService from "@/app/services/apiService";
import useLoginModal from "@/app/hooks/useLoginModal";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import DateSelector from "../forms/Calendar";

const initialdateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

export type Property = {
  id: string;
  guests: number;
  price: number;
};

interface ReservationSidebarProps {
  userId: string | null;
  property: Property;
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
  property,
  userId,
}) => {
  const loginModal = useLoginModal();

  const [fee, setFee] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>(initialdateRange);
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [guests, setGuests] = useState<string>("1");
  const guestsRange = Array.from({ length: property.guests }, (_, i) =>
    (i + 1).toString()
  );

  const createBooking = async () => {
    if (!userId) {
      loginModal.openModal();
      return;
    }

    if (dateRange.startDate && dateRange.endDate) {
      const formData = new FormData();
      formData.append("guests", guests);
      formData.append("start_date", format(dateRange.startDate, "yyyy-MM-dd"));
      formData.append("end_date", format(dateRange.endDate, "yyyy-MM-dd"));
      formData.append("number_of_nights", nights.toString());
      formData.append("total_price", totalPrice.toString());

      const response = await apiService.post(
        `/api/properties/${property.id}/bookings/`,
        formData
      );
      if (response.success) {
        alert("Booking created successfully!");
      } else {
        alert("Failed to create booking. Please try again.");
      }
    }
  };

  const _setDateRange = (selection: any) => {
    const newStartDate = new Date(selection.startDate);
    const newEndDate = new Date(selection.endDate);

    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate() + 1);
    }

    setDateRange({
      startDate: newStartDate,
      endDate: newEndDate,
      key: "selection",
    });
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
      if (dayCount && property.price) {
        const calculatedFee = dayCount * property.price * 0.1; // 10% fee
        setFee(calculatedFee);
        setTotalPrice(dayCount * property.price + calculatedFee);
        setNights(dayCount);
      } else {
        const calculatedFee = property.price * 0.1; // 10% fee
        setFee(calculatedFee);
        setTotalPrice(property.price + calculatedFee);
        setNights(1);
      }
    }
  }, [dateRange]);

  return (
    <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
      <h2 className="mb-5 text-2xl">${property.price} per night</h2>
      <DateSelector
        value={dateRange}
        onChange={(ranges) => setDateRange(ranges.selection)}
        bookedDates={[]}
      />
      <div className="mb-6 p-3 border border-gray-400 rounded-xl">
        <label className="mb-2 block font-bold text-xs">Guests</label>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full -ml-1 text-xm"
        >
          {guestsRange.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>
      <div
        className="w-full mb-6 py-6 text-center text-white bg-red-400 hover:bg-red-700 rounded-xl"
        onClick={createBooking}
      >
        Book
      </div>
      <div className="mb-4 flex justify-between align-center">
        <p>
          ${property.price} * {nights} nights
        </p>
        <p>${property.price * nights}</p>
      </div>
      <div className="mb-4 flex justify-between align-center">
        <p>DjangoBnB Fee</p>
        <p>${fee}</p>
      </div>
      <hr />
      <div className="mt-4 flex justify-between align-center font-bold">
        <p>Total</p>
        <p>${totalPrice}</p>
      </div>
    </aside>
  );
};
export default ReservationSidebar;
