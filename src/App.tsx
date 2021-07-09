import React from "react";
import Header from "./components/Header";
import TableView from "./components/TableView";
import { Row, Col } from "antd";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Row>
        <Col xs={24} sm={{ span: 16, offset: 4 }} md={{ span: 18, offset: 3 }}>
          <TableView />
        </Col>
      </Row>
    </>
  );
};

export default App;
