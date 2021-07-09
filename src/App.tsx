import React from "react";
import Header from "./components/Header";
import TableView from "./components/TableView";
import { Row, Col } from "antd";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Row>
        <Col xs={24} md={{ span: 12, offset: 6 }}>
          <TableView />
        </Col>
      </Row>
    </>
  );
};

export default App;
