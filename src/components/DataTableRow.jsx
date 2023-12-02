import { gql, useMutation } from "@apollo/client";
import classNames from "classnames";
import { useState } from "react";
import { ReactComponent as Checkmark } from "../assets/checkmark.svg";
import { ReactComponent as Edit } from "../assets/edit.svg";
import { GET_DATA } from "./DataTable";
import DataTableItem from "./DataTableItem";
import styles from "./DataTableRow.module.css";

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
    if (name !== dataSource.name || archived !== dataSource.archived) {
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
    }
    setEditMode(false);
  };

  return (
    <tr
      key={dataSource.id}
      className={classNames(styles.row, {
        [styles.rowEdit]: editMode,
      })}
    >
      <td>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!editMode}
          className={styles.input}
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
      <td className={styles.btnColumn}>
        {editMode ? (
          <button
            onClick={handleUpdate}
            className={classNames(styles.btn, styles.checkmark)}
          >
            <Checkmark />
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className={classNames(styles.btn, styles.edit)}
          >
            <Edit />
          </button>
        )}
      </td>
    </tr>
  );
};

export default DataTableRow;
