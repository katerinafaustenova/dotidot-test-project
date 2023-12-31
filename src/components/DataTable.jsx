import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const filterColumns = JSON.parse(localStorage.getItem("filter"));
    filterColumns?.length > 0 && setColumnsToShow(filterColumns);
  }, []);

  const handleChange = (selected) => {
    const selectedArray = selected.map(({ value }) => value);
    setColumnsToShow(selectedArray);
    localStorage.setItem("filter", JSON.stringify(selectedArray));
  };

  return (
    <div className={styles.container}>
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
          <section className={styles.tableSection}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th className={styles.nameColumnLabel}>
                    {getItemLabel("name")}
                  </th>
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
          </section>
        </>
      )}
    </div>
  );
};

export default DataTable;
