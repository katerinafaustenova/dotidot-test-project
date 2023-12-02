import { formatDistance } from "date-fns";

const DataTableItem = ({
  dataSource,
  column,
  editMode,
  archived,
  setArchived,
}) => {
  if (!dataSource || !column) return;
  const getItemData = () => {
    switch (column) {
      case "archived":
        return (
          <select
            id={`${dataSource.id}-${column}`}
            value={archived}
            onChange={(e) => setArchived(e.target.value === "true")}
            disabled={!editMode}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        );
      case "createdAt":
        const createdAtDate = new Date(dataSource[column]);
        if (!isNaN(new Date(createdAtDate))) {
          const localeDate = createdAtDate.toLocaleDateString();
          return localeDate;
        } else return "--";
      case "updatedAt":
      case "lastImport":
        const updatedImportedDate = new Date(dataSource[column]);
        if (!isNaN(new Date(updatedImportedDate))) {
          const distance = formatDistance(updatedImportedDate, new Date());
          return `${distance} ago`;
        } else return "--";
      default:
        return dataSource[column];
    }
  };
  return <td key={`${dataSource.id}-${column}`}>{getItemData()}</td>;
};

export default DataTableItem;
