import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_DATA } from "./DataTable";
import DataTableItem from "./DataTableItem";

const UPDATE_DATA = gql`
  mutation UpdateDataSource($id: BigInt!, $name: String, $archived: Boolean) {
    updateDataSource(id: $id, name: $name, archived: $archived) {
      dataSource {
        name
        archived
      }
    }
  }
`;

const DataTableRow = ({ dataSource, columnsToShow }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(dataSource.name);
  const [archived, setArchived] = useState(dataSource.archived);
  const [updateDataSource] = useMutation(UPDATE_DATA);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      const data = await updateDataSource({
        variables: {
          id: dataSource.id,
          name: name,
          archived: archived,
        },
        refetchQueries: [{ query: GET_DATA }],
      });
      console.log("Updated data:", data);
    } catch (error) {
      console.error("Mutation error:", error);
    }
    setEditMode(false);
  };

  return (
    <tr key={dataSource.id}>
      <td>
        <input
          id={"name"}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!editMode}
        />
      </td>
      {columnsToShow.map((column) => (
        <DataTableItem
          key={`${dataSource.id}-${column}`}
          dataSource={dataSource}
          column={column}
          editMode={editMode}
          archived={archived}
          setArchived={setArchived}
        />
      ))}
      <td>
        {editMode ? (
          <button onClick={handleUpdate}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </td>
    </tr>
  );
};

export default DataTableRow;
