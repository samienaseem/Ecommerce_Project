import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from 'react-router-dom';

export default function SignInScreen(){
    const location=useLocation()
    // const redirect = new URLSearchParams(location.search).get('redirect') || '/';
    const redirectUrl=new URLSearchParams(location.search).get('redirect');
    const redirect = redirectUrl? redirectUrl : '/'

    return (
      <Container className="small-container">
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Sign In</Button>
          </div>

          <div className="mb-3">
            New Customer?{'  '}
            <Link to={`/signup?redirect=${redirect}`}>Create Your Account</Link>
          </div>
        </Form>
      </Container>
    );
}