import React, { useState, useRef, useEffect } from 'react';
import notification_icon from '../assets/dashboard/Notification.png'
const Notifications = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const notifications = [
    { id: 1, message: "🚨 Accident reported at Matka Chowk" },
    { id: 2, message: "🚑 Ambulance dispatched" },
    {id:3, message:"Dispatched a patient"}
  ];

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
    
      <button onClick={() => setOpen(!open)} className="relative">
        <img src={notification_icon} alt="Notifications" className="h-7 w-7" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md z-50 p-4 text-sm">
          <h4 className="font-semibold mb-2">Notifications</h4>
          {notifications.map((note) => (
            <div key={note.id} className="border-b pb-2 mb-2">
              {note.message}
            </div>
          ))}
          {notifications.length === 0 && <p>No new notifications</p>}
        </div>
      )}
    </div>
  );
};

export default Notifications;
