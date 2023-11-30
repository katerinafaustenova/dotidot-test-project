import Select from "react-select";
import getItemLabel from "../utils/getItemLabel";

export function MultiSelect({
  label,
  options,
  defaultValues,
  setSelectedOptions,
}) {
  const handleChange = (selected) => {
    const selectedArray = selected.map(({ value }) => value);
    setSelectedOptions(selectedArray);
  };

  const optionsObject = options.map((option) => {
    return {
      value: option,
      label: getItemLabel(option),
    };
  });

  const defaultValuesObject = defaultValues.map((value) => {
    return {
      value,
      label: getItemLabel(value),
    };
  });

  return (
    <Select
      options={optionsObject}
      defaultValue={defaultValuesObject}
      onChange={handleChange}
      isMulti
      closeMenuOnSelect={false}
      placeholder={label}
      noOptionsMessage={() => "Žádné další možnosti"}
      classNamePrefix="react-select"
    />
  );
}
