import React from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { Table } from "antd";
import "./components.css";

// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

const LIST_COUNTRIES = gql`
  {
    countries {
      code
      name
      capital
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

interface ICountry {
  name: string;
  code: number;
  capital: string;
}

interface ICountriesinfo extends ICountry {
  languages: Array<ICountry>;
  continent: ICountry;
}
// dataIndex?: string;
// record?(): string;

const TableView: React.FC = () => {
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  const compareByAlph = (a: string, b: string) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  };

  let data_source: Array<ICountriesinfo> = data.countries.map(
    (item: ICountriesinfo) => ({ ...item, key: item.code })
  );

  // console.log(data.countries);
  // console.log(data_source);
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
      sorter: (a: ICountry, b: ICountry) => compareByAlph(a.capital, b.capital),
    },
    {
      title: "Languages",
      render: (record: ICountriesinfo): string =>
        record.languages.map((item) => item.name).join(", "),
      key: "languages[0].code",
    },
    {
      title: "Continent",
      render: (record: ICountriesinfo): string => record.continent.name,
      key: "continent.code",
    },
  ];

  return (
    <>
      <Table<ICountriesinfo>
        columns={columns}
        dataSource={data_source}
        className="table"
      />
    </>
  );
};

export default TableView;
