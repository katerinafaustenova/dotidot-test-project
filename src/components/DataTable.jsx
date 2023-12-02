import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import getItemLabel from "../utils/getItemLabel";
import styles from "./DataTable.module.css";
import DataTableRow from "./DataTableRow";
import { MultiSelect } from "./MultiSelect";
import Spinner from "./Spinner";

export const GET_DATA = gql`
  query DataSources {
    collection(
      page: 0
      limit: 100
      identifier: "organization"
      organizationId: 19952
    ) {
      dataSources {
        id
        name
        archived
        createdAt
        updatedAt
        icon
        itemsCount
        lastImport
      }
    }
  }
`;

const DataTable = () => {
  const { data, loading, error } = useQuery(GET_DATA);
  const [columnsToShow, setColumnsToShow] = useState([
    "itemsCount",
    "createdAt",
    "updatedAt",
  ]);

  const handleChange = (selected) => {
    const selectedArray = selected.map(({ value }) => value);
    setColumnsToShow(selectedArray);
  };

  return (
    <div id="container" className={styles.container}>
      {loading && <Spinner />}
      {error && <p className={styles.error}>Error fetching data</p>}
      {data && (
        <>
          <MultiSelect
            label="Zobrazit sloupce"
            options={Object.keys(data?.collection?.dataSources?.[0]).filter(
              (key) => !key.startsWith("__") && key !== "name" && key !== "id"
            )}
            defaultValues={columnsToShow}
            handleSelectChange={(selected) => handleChange(selected)}
          />
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th>{getItemLabel("name")}</th>
                {columnsToShow.map((column) => (
                  <th key={column}>{getItemLabel(column)}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {data.collection.dataSources.map((dataSource) => {
                return (
                  <DataTableRow
                    key={dataSource.id}
                    dataSource={dataSource}
                    columnsToShow={columnsToShow}
                  />
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DataTable;
