import React from "react";
import { Modal } from "react-responsive-modal";
import { differenceInCalendarDays } from "date-fns";

const BookingModal = ({ showModal, closeModal, bookings }) => {
  return (
    <Modal open={showModal} onClose={closeModal} center={true}>
      <div className="px-2 py-2">
        {bookings.length > 0 ? (
          <h2 className="text-center text-black text-2xl font-bold">
            Bookings
          </h2>
        ) : (
          <h2 className="px-4 py-3">No Bookings for this User</h2>
        )}
        <ul>
          {bookings.map((booking, index) => (
            <div className=" border border-black bg-gray-300 mt-2 rounded-xl px-8 py-8">
              <li key={index} className="text-lg font-bold">
                Name : {booking.name}
              </li>
              <li>Place : {booking.place.title}</li>
              <li>Adress : {booking.place.address}</li>
              <li>
                Nights :{" "}
                {differenceInCalendarDays(
                  new Date(booking.checkOut),
                  new Date(booking.checkIn)
                )}{" "}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default BookingModal;
