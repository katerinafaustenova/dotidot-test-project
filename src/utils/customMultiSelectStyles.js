export const customStyles = {
  control: (styles) => ({
    ...styles,
    marginBottom: "30px",
    borderRadius: "0px",
  }),
  menu: (styles) => {
    return {
      ...styles,
      top: "32px",
      borderRadius: "0px",
      overflow: "hidden",
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      borderRadius: "0px",
    };
  },
  clearIndicator: (styles) => ({
    ...styles,
    ":hover": {
      color: "#DE350B",
      cursor: "pointer",
    },
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    ":hover": {
      color: "#2684ff",
      cursor: "pointer",
    },
  }),
};
