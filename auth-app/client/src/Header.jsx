import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';

const Header = () => {
  return (
    <Row>
      <Col className='text-center'>
        <h1>React Authentication</h1>

        <section id='navigation'>
          <Link to='/'>Home</Link>
          <Link to='/free'>Free Component</Link>
          <Link to='/auth'>Auth Component</Link>
        </section>
      </Col>
    </Row>
  );
};

export default Header;
