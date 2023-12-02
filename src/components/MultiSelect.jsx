import Select from "react-select";
import { customStyles } from "../utils/customMultiSelectStyles";
import getItemLabel from "../utils/getItemLabel";

export function getMultiSelectObject(values) {
  const newObject = values.map((value) => {
    return {
      value,
      label: getItemLabel(value),
    };
  });
  return newObject;
}

export function MultiSelect({
  label,
  options,
  defaultValues,
  handleSelectChange,
}) {
  return (
    <Select
      options={getMultiSelectObject(options)}
      defaultValue={getMultiSelectObject(defaultValues)}
      onChange={handleSelectChange}
      isMulti
      closeMenuOnSelect={false}
      placeholder={label}
      noOptionsMessage={() => "Žádné další možnosti"}
      styles={customStyles}
    />
  );
}
