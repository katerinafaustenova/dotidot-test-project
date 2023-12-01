export const TableColumns = {
  id: "ID",
  name: "Name",
  archived: "Archived",
  createdAt: "Created",
  updatedAt: "Last Update",
  icon: "Icon",
  itemsCount: "Items Counts",
  lastImport: "Last Import",
};

export default function getItemLabel(item) {
  const label = Object.entries(TableColumns).find(
    (entry) => entry[0] === item
  )?.[1];
  return label || item;
}
