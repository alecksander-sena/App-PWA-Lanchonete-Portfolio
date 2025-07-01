import { useState, useEffect } from "react";

// Horários de funcionamento (em minutos desde a meia-noite)
const OPEN_HOURS = [
  { start: 7 * 60, end: 13 * 60 + 30 },    // 07:00–13:30
  { start: 17 * 60, end: 21 * 60 },        // 17:00–21:00
];

// Lista de feriados nacionais (adicione mais datas se quiser)
const NATIONAL_HOLIDAYS = [
  // "2025-01-01", "2025-12-25", ...
];

function isNationalHoliday(date: Date) {
  const iso = date.toISOString().slice(0, 10);
  return NATIONAL_HOLIDAYS.includes(iso);
}

export function useOpeningHours() {
  const [isOpen, setIsOpen] = useState(true);
  const [showClosedModal, setShowClosedModal] = useState(false);
  const [isSundayOrHoliday, setIsSundayOrHoliday] = useState(false);

  useEffect(() => {
    const now = new Date();
    const day = now.getDay(); // 0 = domingo, 1 = segunda...
    const minutes = now.getHours() * 60 + now.getMinutes();

    let open = false;
    let isFeriado = isNationalHoliday(now);
    let isDomingo = day === 0;

    if (!isFeriado && !isDomingo) {
      for (const { start, end } of OPEN_HOURS) {
        if (minutes >= start && minutes < end) open = true;
      }
    }
    setIsOpen(open);
    setIsSundayOrHoliday(isDomingo || isFeriado);

    if (!open) setShowClosedModal(true);
  }, []);

  function closeModal() {
    setShowClosedModal(false);
  }

  return {
    isOpen,
    showClosedModal,
    closeModal,
    isSundayOrHoliday,
  };
}