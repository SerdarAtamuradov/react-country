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

const TableView: React.FC = () => {
  const { data, loading, error } = useQuery(LIST_COUNTRIES, {
    client,
  });

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
      key: "languages",
    },
    {
      title: "Continent",
      render: (record: ICountriesinfo): string => record.continent.name,
      key: "continent",
      filters: [
        {
          text: "Europe",
          value: "Europe",
        },
        {
          text: "Asia",
          value: "Asia",
        },
        {
          text: "Africa",
          value: "Africa",
        },
        {
          text: "North America",
          value: "North America",
        },
        {
          text: "South America",
          value: "South America",
        },
        {
          text: "Oceania",
          value: "Oceania",
        },
        {
          text: "Antarctica",
          value: "Antarctica",
        },
      ],
      onFilter: (value: any, record: ICountriesinfo) =>
        record.continent.name.indexOf(value) === 0,
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
