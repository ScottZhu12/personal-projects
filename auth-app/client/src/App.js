import './App.css';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

import Account from './Account';
import FreeComponent from './FreeComponent';
import AuthComponent from './AuthComponent';
import Layout from './Layout';
import ProtectedRoutes from './ProtectedRoutes';

const App = () => {
  return (
    <Container>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Account />} />
          <Route path='/free' element={<FreeComponent />} />
          <Route
            path='/auth'
            element={
              <ProtectedRoutes>
                <AuthComponent />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </Container>
  );
};

export default App;
