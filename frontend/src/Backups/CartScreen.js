import axios from "axios"
import { useContext } from "react"
import Card from 'react-bootstrap/Card'
import Container from "react-bootstrap/Container"
import Button from 'react-bootstrap/esm/Button'
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import { Helmet } from "react-helmet-async"
import { Link, useNavigate } from "react-router-dom"
import MessageBox from "../Components/MessageBox"
import { Store } from "../Store"


export default function CartScreen() {
    const navigate=useNavigate()
    const {state,dispatch:ctxDispatch}=useContext(Store)
    console.log({'cartScreen': state})
    const {cart:{ cartItems },
    }=state
    console.log({'cartItems':cartItems})

    const UpdateCartHandler=async(item,quantity)=>{
        console.log({"UpdateCartHandler" : quantity, "Itemsquantity":{...item,quantity}})
        const {data} = await axios.get(`/api/product/${item._id}`)

        if(data.countInStock < quantity){
            window.alert("Sorry, Not Enough in Stock");
            return
        }

        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload : {...item,quantity}
        })

    }
    const removeItemHandler=(item)=>{
        ctxDispatch({
            type: 'CART_REMOVE_ITEM',
            payload:item
        })
    }
    const CheckoutCartHandler=()=>{
      navigate('/signin?redirect=/shipping')

    }
    return (
      <div>
        <Container>
          <Helmet>
            <title>Shopping Cart</title>
          </Helmet>
          <h1>Shopping Cart</h1>
            <Row>
            <Col md={9}>
                {cartItems.length === 0 ? (
                <MessageBox>
                    Cart is Empty.
                    <Link to="/"> Go Shopping</Link>
                </MessageBox>
                ) : (
                <ListGroup variant="flush">
                    {cartItems
                    .slice() // Creates a shallow copy of the array to avoid mutating the original cartItems
                    .reverse() // Reverse the copy of the array so new items appear on top
                    .map((item) => (
                        <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                            <Col md={4}>
                            <img
                                className="img-fluid rounded img-thumbnail"
                                src={item.image}
                                alt={item.name}
                            />{' '}
                            {/* <Link to={`/product/${item.slug}`}>{item.name}</Link> */}
                            </Col>
                            {/* -------MyVersion---------- */}
                            <Col md={8}>
                            <Row>
                                <Col md={12} className="cartItemTitle">
                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                </Col>
                            </Row>
                            <Row className="align-items-center">
                                <Col md={5}>
                                <Button
                                    variant="light"
                                    disabled={item.quantity === 1}
                                    onClick={() =>
                                    UpdateCartHandler(item, item.quantity - 1)
                                    }
                                >
                                    <i className="fas fa-minus-circle"></i>
                                </Button>{' '}
                                <span className="cartItemQuantity">{item.quantity}</span>{' '}
                                <Button
                                    variant="light"
                                    disabled={item.quantity === item.countInStock}
                                    onClick={() => {
                                    UpdateCartHandler(item, item.quantity + 1);
                                    }}
                                >
                                    <i className="fas fa-plus-circle"></i>
                                </Button>{' '}
                                </Col>
                                <Col md={5}>£{item.price}</Col>
                                <Col md={2}>
                                <Button
                                    variant="light"
                                    onClick={() => {
                                    removeItemHandler(item);
                                    }}
                                >
                                    <i className="fas fa-trash"></i>
                                </Button>
                                </Col>
                            </Row>
                            </Col>
                            {/* ----------End---------- */}
                            {/* <Col md={3}>
                                    <Button disabled={item.quantity === 1}>
                                        <i className="fas fa-minus-circle"></i>
                                    </Button>{' '}
                                    <span>{item.quantity}</span>{' '}
                                    <Button
                                        disabled={item.quantity === item.countInStock}
                                    >
                                        <i className="fas fa-plus-circle"></i>
                                    </Button>{' '}
                                    </Col>
                                    <Col md={3}>£{item.price}</Col>
                                    <Col md={2}>
                                    <Button variant="light">
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                    </Col> */}
                        </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                )}
            </Col>
            <Col md={3}>
                <Card>
                <Card.Body>
                    <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h5>
                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) :
                        £ {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                        </h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="d-grid">
                        <Button
                            onClick={CheckoutCartHandler}
                            variant="primary"
                            type="button"
                            disabled={cartItems.length === 0}
                        >
                            Proceed to Checkout
                        </Button>
                        </div>
                    </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
    </div>
