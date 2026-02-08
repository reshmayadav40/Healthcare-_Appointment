// Date formatting helper
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-IN", options);
};

export const formatDateTime = (dateString, timeString) => {
  return `${formatDate(dateString)} at ${timeString}`;
};

// Filter doctors by specialty
export const filterBySpecialty = (doctors, specialty) => {
  if (!specialty) return doctors;
  return doctors.filter((doc) =>
    doc.specialty.toLowerCase().includes(specialty.toLowerCase())
  );
};

// Filter doctors by location
export const filterByLocation = (doctors, location) => {
  if (!location) return doctors;
  return doctors.filter((doc) =>
    doc.location.toLowerCase().includes(location.toLowerCase())
  );
};

// Filter doctors by availability
export const filterByAvailability = (doctors, available) => {
  if (!available) return doctors;
  return doctors.filter((doc) => doc.available === available);
};

// Separate upcoming and past appointments
export const separateAppointments = (appointments) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate >= today;
  });

  const past = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate < today;
  });

  return { upcoming, past };
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
};

// Calculate consultation cost with discount
export const calculateCost = (baseCost, discountPercent = 0) => {
  const discount = (baseCost * discountPercent) / 100;
  return baseCost - discount;
};
