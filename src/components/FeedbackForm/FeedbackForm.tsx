"use client";

import type { FormInput } from "./types/FeedbackForm.types";

import styles from "./FeedbackForm.module.scss";
import Icon from "@/components/Icon/Icon";
import Button from "@/components/Button/Button";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import handlePhoneChange from "@/utils/handlePhoneChange";
import InputLabel from "@/components/InputLabel/InputLabel";
import useDeviceDetection from "@/context/useDeviceDetection";

const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormInput>();

  const { isMobile, isTablet } = useDeviceDetection();

  const getButtonSize = () => {
    if (isMobile) return "s";
    if (isTablet) return "m";
    return "l";
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    void data;
    reset();
  };

  return (
    <form className={styles.feedbackForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.feedbackInputContainer}>
        <InputLabel htmlFor="name" required={true}>
          FULL NAME
        </InputLabel>
        <input
          id="name"
          {...register("name", {
            required: "Required",
            pattern: {
              value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ'’ʼ\s]+$/,
              message: "Must  have just letters"
            }
          })}
          className={`${styles.feedbackInput} ${errors.name ? styles.inputError : ""}`}
          placeholder="Enter your full name"
          type="text"
        />

        {errors.name && (
          <p className={styles.inputErrorText}>{errors.name.message}</p>
        )}
      </div>

      <div className={styles.feedbackInputContainer}>
        <InputLabel htmlFor="phoneNumber" required={true}>
          PHONE NUMBER
        </InputLabel>

        <div className={styles.phoneNumberInputContainer}>
          <input
            id="phoneNumber"
            {...register("phoneNumber", {
              required: "Required",
              minLength: {
                value: 17,
                message: "Enter full number"
              }
            })}
            className={`${styles.feedbackInput} ${errors.phoneNumber ? styles.inputError : ""}`}
            placeholder="+480 __ ___ __ __"
            type="tel"
            onChange={(event) => handlePhoneChange(event, setValue)}
            onFocus={(event) => handlePhoneChange(event, setValue)}
          />
          <Icon
            className={styles.inputIconPhone}
            color="none"
            name="icon-phone"
            stroke="#96989B"
          />
        </div>

        {errors.phoneNumber && (
          <p className={styles.inputErrorText}>{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <Button
          className="feedbackButton"
          size={getButtonSize()}
          variant="primary"
        >
          <div className={styles.iconContainer}>
            <Icon
              className={styles.feedbackButtonIcon}
              fill="white"
              name="icon-arrow-up-right2"
              size={isMobile ? 20 : 30}
              stroke="none"
            />
          </div>
          <span className={styles.feedbackButtonText}> SEND</span>
        </Button>
      </div>
    </form>
  );
};

export default FeedbackForm;
