import { useState } from "react";

const useSelect = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

export default useSelect;
