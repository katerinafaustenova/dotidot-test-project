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
            id={`${dataSource.name}-${column}`}
            name="archived"
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
        const localeDate = createdAtDate.toLocaleDateString();
        return localeDate;
      case "updatedAt":
      case "lastImport":
        const now = new Date();
        const updatedImportedDate = new Date(dataSource[column]);
        const distance = formatDistance(updatedImportedDate, now);
        return `${distance} ago`;
      default:
        return dataSource[column];
    }
  };
  return <td key={`${dataSource.id}-${column}`}>{getItemData()}</td>;
};

export default DataTableItem;
