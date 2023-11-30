import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import getItemLabel from "../utils/getItemLabel";
import { MultiSelect } from "./MultiSelect";

const GET_DATA = gql`
  query DataSources {
    collection(
      page: 0
      limit: 100
      identifier: "organization"
      organizationId: 19952
    ) {
      dataSources {
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

const UPDATE_DATA = gql`
  mutation UpdateDataSource($id: ID!, $name: String!, $archived: Boolean!) {
    updateDataSource(id: $id, name: $name, archived: $archived) {
      name
      archived
    }
  }
`;

const initState = ["name", "itemsCount", "createdAt", "updatedAt"];

const DataTable = () => {
  const { data, loading, error } = useQuery(GET_DATA);
  const [updateDataSource] = useMutation(UPDATE_DATA);
  const [columnsToShow, setColumnsToShow] = useState(initState);

  // const handleUpdateDataSource = (id, name, archived) => {
  //   updateDataSource({ variables: { id, name, archived } })
  //     .then()
  //     .catch();
  // };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data</p>}
      {data && (
        <>
          <MultiSelect
            label="Zobrazit sloupce"
            options={Object.keys(data?.collection?.dataSources?.[0]).filter(
              (key) => !key.startsWith("__")
            )}
            defaultValues={columnsToShow}
            setSelectedOptions={setColumnsToShow}
          />
          <table>
            <thead>
              <tr>
                {columnsToShow.map((column) => (
                  <th key={column}>{getItemLabel(column)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.collection.dataSources.map((dataSource) => {
                return (
                  <tr key={dataSource.name}>
                    {columnsToShow.map((column) => {
                      return (
                        <td key={`${dataSource.name}-${column}`}>
                          {typeof dataSource[column] === "boolean"
                            ? dataSource[column].toString()
                            : dataSource[column]}
                        </td>
                      );
                    })}
                  </tr>
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
