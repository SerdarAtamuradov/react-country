import React from "react";
import { PageHeader, Divider } from "antd";
import "./components.css";

const Header: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Table-View of Countries using React, TypeScript, AntDesign "
        className="header_page"
      />
      <Divider style={{ margin: 0 }} />
    </>
  );
};

export default Header;
