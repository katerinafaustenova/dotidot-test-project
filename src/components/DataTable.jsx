import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

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

const DataTable = () => {
  const { data, loading, error } = useQuery(GET_DATA);
  const [updateDataSource] = useMutation(UPDATE_DATA);

  const [columnsToShow, setColumnsToShow] = useState([
    "name",
    "itemsCount",
    "createdAt",
    "lastImport",
  ]);

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
        <table>
          <thead>
            <tr>
              {columnsToShow.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.collection.dataSources.map((dataSource) => (
              <tr key={dataSource.name}>
                {columnsToShow.map((column) => (
                  <td key={`${dataSource.name}-${column}`}>
                    {dataSource[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataTable;
