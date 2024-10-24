// this product template for designing the product in cart and placeorder screen and orderscreen

import React from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

export default function ProductTemplate({item}) {
  return (
    <div>
      <ListGroup.Item key={item._id} className='my-3'>
        <Row className="RowItem align-items-stretch my-3">
          <Col md={3}>
            <img
              className="img-fluid h-100 rounded img-thumbnail"
              src={item.image}
              alt={item.name}
            />{' '}
            {/* <Link to={`/product/${item.slug}`}>{item.name}</Link> */}
          </Col>
          {/* -------MyVersion---------- */}
          <Col md={9} className='d-flex flex-column'>
            <Row className='my-3'>
              <Col md={12} className="cartItemTitle">
                <Link to={`/product/${item.slug}`} className='noLinkDecoration'>{item.name}</Link>
              </Col>
            </Row>
            <Row className="align-items-center my-3">
              <Col md={12}>
                <span className="cartItemQuantity my-3">QTY: {item.quantity}</span>
              </Col>
              <Col md={12}>
                <span>£{item.price}</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </ListGroup.Item>
    </div>
  );
}
