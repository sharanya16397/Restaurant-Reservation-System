import React, { useState } from "react";
import "./styles.css";

const ReservationSystem = () => {
  const totalSeats = 25;
  const [availableSeats, setAvailableSeats] = useState(totalSeats);
  const [reservations, setReservations] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guestCount, setGuestCount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const guests = parseInt(guestCount);

    if (!name || !phone || guests < 1) {
      alert("Please fill in all fields correctly.");
      return;
    }

    if (guests > availableSeats) {
      alert("Sorry, Not enough seats available currently. Please reserve later.");
      return;
    }

    if (reservations.some((res) => res.name === name)) {
      if (!window.confirm("This reservation name already exists. Proceed anyway?")) return;
    }

    const newReservation = {
      name,
      phone,
      guests,
      checkInTime: new Date().toLocaleTimeString(),
      checkedOut: false,
    };

    setReservations([...reservations, newReservation]);
    setAvailableSeats(availableSeats - guests);
    setName("");
    setPhone("");
    setGuestCount("");
  };

  const handleCheckout = (index) => {
    const updatedReservations = [...reservations];
    updatedReservations[index].checkedOut = true;
    updatedReservations[index].checkOutTime = new Date().toLocaleTimeString();
    setAvailableSeats(availableSeats + updatedReservations[index].guests);
    setReservations(updatedReservations);
  };

  const handleDelete = (index) => {
    const reservation = reservations[index];
    if (!reservation.checkedOut) {
      setAvailableSeats(availableSeats + reservation.guests);
    }
    setReservations(reservations.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Restaurant Reservation</h1>
      <p className="seats">Seats Left: <span>{availableSeats}</span></p>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="tel" placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input type="number" placeholder="Guest Count" min="1" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} required />
        <button type="submit">Book Table</button>
      </form>

      <h2>Reservations</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Guests</th>
            <th>Check-in Time</th>
            <th>Checkout</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res, index) => (
            <tr key={index}>
              <td>{res.name}</td>
              <td>{res.phone}</td>
              <td>{res.guests}</td>
              <td>{res.checkInTime}</td>
              <td>
                {res.checkedOut ? res.checkOutTime : (
                  <button className="checkoutBtn" onClick={() => handleCheckout(index)}>Click to Checkout</button>
                )}
              </td>
              <td>
                <button className="deleteBtn" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationSystem;
