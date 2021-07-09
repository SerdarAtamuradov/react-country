import React from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { Table } from "antd";
import "./components.css";

// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

interface IPlace {
  name: string;
  code: number;
}

interface ICountriesinfo extends IPlace {
  languages: Array<IPlace>;
  continent: IPlace;
  dataIndex?: string;
  record?(): string;
}

interface ICountry extends IPlace {
  capital: string;
  currency: string;
  phone: string;
}

const LIST_COUNTRIES = gql`
  {
    countries {
      name
      code
      capital
      phone
      currency
      languages {
        name
        code
      }
      continent {
        name
        code
      }
    }
  }
`;

const TableView: React.FC = () => {
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Capital",
      dataIndex: "capital",
      key: "capital",
    },
    {
      title: "Languages",
      render: (record: ICountriesinfo) =>
        record.languages.map((item) => item.name).join(", "),
      key: "languages[0].code",
    },
    {
      title: "Continent",
      render: (record: ICountriesinfo) => record.continent.name,
      key: "continent.code",
    },
  ];

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  return (
    <>
      <Table<ICountry>
        columns={columns}
        dataSource={data.countries}
        className="table"
      />
    </>
  );
};

export default TableView;
