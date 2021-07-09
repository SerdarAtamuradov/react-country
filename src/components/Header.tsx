import React from "react";
import { PageHeader, Divider } from "antd";

const Header: React.FC = () => {
  return (
    <>
      <PageHeader title="Table-View of Countries" />
      <Divider style={{ margin: 0 }} />
    </>
  );
};

export default Header;
