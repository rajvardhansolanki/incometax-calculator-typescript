import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { TextType } from "common/type";

const CustomText = ({
  onKeyDowns,
  errors,
  helperTexts,
  types,
  labels,
  names,
  onChanges,
  maxLength
}: TextType) => {
  const [val, setVal] = useState("");

  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay]
    );
    return debouncedValue;
  };

  const debouncedValue = useDebounce(val, 500);

  useEffect(() => {
    onChanges(names, debouncedValue);
  }, [debouncedValue, names, onChanges]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  return (
    <TextField
      fullWidth
      onKeyDown={onKeyDowns}
      error={errors}
      helperText={helperTexts}
      type={types}
      label={labels}
      name={names}
      onChange={handleChange}
      variant="outlined"
      autoComplete="off"
      InputProps={{
        inputProps: {
          min: 0,
          max: maxLength
        }
      }}

    />
  );
};

export default CustomText;
