"use client";

import { useForm } from "react-hook-form";
import { useEffect, useImperativeHandle, forwardRef, useRef } from "react";
import styles from "./SummaryForm.module.scss";
import type { FormInput } from "./types/SummaryForm.types";
import InputLabel from "../InputLabel/InputLabel";
import handlePhoneChange from "@/utils/handlePhoneChange";

interface SummaryFormProps {
  onFormChange: (data: FormInput, isValid: boolean) => void;
}

const SummaryForm = forwardRef(function SummaryForm({ onFormChange }: SummaryFormProps, ref) {
  const {
    register,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger
  } = useForm<FormInput>({ mode: "onChange" });

  const values = watch();
  const prev = useRef<{ values: FormInput; isValid: boolean } | null>(null);

  // Track changes
  useEffect(() => {
    const changed =
      !prev.current ||
      Object.keys(values).some((key) => values[key as keyof FormInput] !== prev.current!.values[key as keyof FormInput]) ||
      prev.current.isValid !== isValid;

    if (changed) {
      onFormChange(values, isValid);
      prev.current = { values, isValid };
    }
  }, [values, isValid, onFormChange]);

  useImperativeHandle(ref, () => ({
    triggerValidation: () => trigger(undefined, { shouldFocus: true })
  }));

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlePhoneChange(e, (field, value) => setValue(field, value, { shouldValidate: true }));
  };

  return (
    <form className={styles.summaryForm} id="summaryForm">
      <h2 className={styles.formTitle}>Delivery </h2>

      <div className={styles.inputContainerWrapper}>
        <div className={styles.inputContainer}>
          <InputLabel htmlFor="firstName" required>First Name</InputLabel>
          <input
            id="firstName"
            placeholder="Enter first name"
            type="text"
            {...register("firstName", { required: true })}
            className={`${styles.inputField} ${errors.firstName ? styles.inputError : ""}`}
          />
          {errors.firstName && <p className={styles.inputErrorText}>{errors.firstName.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <InputLabel htmlFor="lastName" required>Last Name</InputLabel>
          <input
            id="lastName"
            placeholder="Enter last name"
            type="text"
            {...register("lastName", { required: true })}
            className={`${styles.inputField} ${errors.lastName ? styles.inputError : ""}`}
          />
          {errors.lastName && <p className={styles.inputErrorText}>{errors.lastName.message}</p>}
        </div>
      </div>

      <div className={styles.inputContainer}>
        <InputLabel htmlFor="phone" required>Phone</InputLabel>
        <input
          id="phone"
          placeholder="+380 __ ___ __ __"
          type="text"
          {...register("phone", { required: true })}
          className={`${styles.inputField} ${errors.phone ? styles.inputError : ""}`}
          onChange={handlePhoneInput}
          onFocus={handlePhoneInput}
        />
        {errors.phone && <p className={styles.inputErrorText}>{errors.phone.message}</p>}
      </div>

      <div className={styles.inputContainerWrapper}>
        <div className={styles.inputContainer}>
          <InputLabel htmlFor="address1" required>Address</InputLabel>
          <input
            id="address1"
            placeholder="Enter address"
            type="text"
            {...register("address1", { required: true })}
            className={`${styles.inputField} ${errors.address1 ? styles.inputError : ""}`}
          />
          {errors.address1 && <p className={styles.inputErrorText}>{errors.address1.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <InputLabel htmlFor="address2">Address 2</InputLabel>
          <input
            id="address2"
            placeholder="Apartment, office, etc."
            type="text"
            {...register("address2")}
            className={styles.inputField}
          />
        </div>
      </div>

      <div className={styles.inputContainerWrapper}>
        <div className={styles.inputContainer}>
          <InputLabel htmlFor="city" required>City</InputLabel>
          <input
            id="city"
            placeholder="City"
            type="text"
            {...register("city", { required: true })}
            className={`${styles.inputField} ${errors.city ? styles.inputError : ""}`}
          />
          {errors.city && <p className={styles.inputErrorText}>{errors.city.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <InputLabel htmlFor="state" required>State / Region</InputLabel>
          <input
            id="state"
            placeholder="State"
            type="text"
            {...register("state", { required: true })}
            className={`${styles.inputField} ${errors.state ? styles.inputError : ""}`}
          />
          {errors.state && <p className={styles.inputErrorText}>{errors.state.message}</p>}
        </div>
      </div>

      <div className={styles.inputContainerWrapper}>
        <div className={styles.inputContainer}>
          <InputLabel htmlFor="postalCode" required>Postal Code</InputLabel>
          <input
            id="postalCode"
            placeholder="Postal code"
            type="text"
            {...register("postalCode", { required: true })}
            className={`${styles.inputField} ${errors.postalCode ? styles.inputError : ""}`}
          />
          {errors.postalCode && <p className={styles.inputErrorText}>{errors.postalCode.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <InputLabel htmlFor="country" required>Country</InputLabel>
          <input
            id="country"
            placeholder="Ukraine"
            type="text"
            {...register("country", { required: true })}
            className={`${styles.inputField} ${errors.country ? styles.inputError : ""}`}
          />
          {errors.country && <p className={styles.inputErrorText}>{errors.country.message}</p>}
        </div>
      </div>

      <div className={styles.inputContainer}>
        <InputLabel htmlFor="comment">Order Notes</InputLabel>
        <textarea
          id="comment"
          placeholder="Any special instructions for delivery"
          {...register("comment")}
          className={styles.inputField}
        />
      </div>
    </form>
  );
});

export default SummaryForm;
