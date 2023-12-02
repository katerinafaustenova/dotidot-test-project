import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import DataTable from "./components/DataTable";

const client = new ApolloClient({
  uri: "/graphql",
  headers: {
    Authorization: `ApiToken ${process.env.REACT_APP_APITOKEN}`,
  },
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <DataTable />
    </ApolloProvider>
  );
}

export default App;
