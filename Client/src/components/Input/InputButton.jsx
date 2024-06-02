import { React, useState } from "react";
import styles from "./InputButton.module.css";

function InputButton({
  type,
  label,
  id,
  value,
  name,
  placeholder,
  error,
  disabled,
  onChange,
  text,
  required = false,
  multiple = false,
}) {
  const [inputType, setInputType] = useState(type);
  const [isValue, setIsValue] = useState(false);
  const [isDisapper,setIsDisapper] = useState(false)

  const onChangeT = (e) => {
    setIsDisapper(false)
    let isValueContained = e.target.value;
    if (isValueContained) {
      setIsValue(true);
    } else {
      setIsValue(false);
    }
    onChange(e);
  };

  const handleErrorClick = () => {
    setIsDisapper(true);
  }

  return (
    <>
      <div className={styles.button}>
        <label htmlFor={id}>{label}</label>
        <div className={styles.input_button}>
          <input
            className={
              error ? `${styles.input} ${styles.error_input}` : styles.input
            }
            style={{outline: isDisapper ? "none" : ""}}
            type={inputType}
            id={id}
            name={name}
            value={value}
            text={text}
            required={required}
            multiple={multiple}
            placeholder={error ? error : placeholder}
            error={error}
            disabled={disabled}
            onChange={onChangeT}
            labelprops={{
              className: "",
            }}
            containerprops={{
              className: "min-w-0",
            }}
          />
          {/* {error && (
            <p className={styles.error}>
              <span className={styles.error_text}>{error}</span>
            </p>
          )} */}
        </div>
      </div>
    </>
  );
}

export default InputButton;
