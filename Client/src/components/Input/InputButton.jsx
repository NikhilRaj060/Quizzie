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
  required=false,
  multiple = false,
  hint
}) {

  const [inputType, setInputType] = useState(type);
  const [isFocused, setIsFocused] = useState(false);
  const [isValue, setIsValue] = useState(false);


const onChangeT = (e) => {
  let isValueContained = e.target.value;
  if (isValueContained) {
    setIsValue(true);
  } else {
    setIsValue(false);
  }
  // You can also call the original onChange prop if needed
  onChange(e);
};



  return (
    <>
      {error && (type !== "password" && type !== "Confirm password") &&(
        <p className="">
          <span>{error}</span>
        </p>
      )}
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          className={styles.input}
          type={inputType}
          id={id}
          name={name}
          value={value}
          text={text}
          required={required}
          multiple={multiple}
          placeholder={placeholder}
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
        {hint ? <span className="text-[#808080] ml-1">{hint}</span> : null}
      </div>
      {error && (type === "password" || type === "Confirm password") ? (
        <p className="">
          <span>{error}</span>
        </p>
      ) : ""}
    </>
  );
}

export default InputButton;
