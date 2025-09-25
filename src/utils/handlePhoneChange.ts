import type { ChangeEvent } from "react";

interface PhoneChangeHandler {
  (
    e: ChangeEvent<HTMLInputElement>,
    setValue: (field: "phone", value: string) => void
  ): void;
}

const handlePhoneChange: PhoneChangeHandler = (e, setValue) => {
  const value = e.target.value.replace(/\D/g, "");

  if (value.length < 4) {
    setValue("phone", "+380 ");
    return;
  }

  const formatted = `+${value.slice(0, 3)} ${value.slice(3, 5)} ${value.slice(5, 8)} ${value.slice(8, 10)} ${value.slice(10, 12)}`.trim();
  setValue("phone", formatted);
};

export default handlePhoneChange;
