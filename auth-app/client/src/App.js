import './App.css';
import { Container, Col, Row } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

import Register from './Register';
import Login from './Login';
import Account from './Account';
import FreeComponent from './FreeComponent';
import AuthComponent from './AuthComponent';

const App = () => {
  return (
    <Container>
      {/* <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Register />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Login />
        </Col>
      </Row> */}

      <Routes>
        <Route path='/'>
          <Route index element={<Account />} />
          <Route path='/free' element={<FreeComponent />} />
          <Route path='/auth' element={<AuthComponent />} />
        </Route>
      </Routes>
    </Container>
  );
};

export default App;
