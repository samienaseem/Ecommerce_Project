import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import { Store } from '../Store';

const reducer =(state,action)=>{
    switch(action.type){
        case "FETCH_REQUEST":{
            return {...state, loading:true}
        }
        case "FETCH_SUCCESS":{
            return {...state, loading: false, products: action.payload.productlist, pages: action.payload.pages}
        }
        case "FETCH_FAIL":{
            return {...state,loading:false, error: action.payload}
        }
        default:
            return state
    }
}

export default function ProductListScreen() {
    const {state} = useContext(Store)
    const {userInfo} = state;

    const {search} = useLocation();
    const sp = new URLSearchParams(search);

    const page=sp.get("page") || 1;

    const [{loading, error, products, pages}, dispatch]=useReducer(reducer, {
        loading: true,
        error: '',
        products:[]
    })

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const {data}= await axios.get(`/api/product/productlist?page=${page}`, {
                    headers:{
                        authorization: `Bearer ${userInfo.token}`
                    }
                })
                dispatch({type: "FETCH_SUCCESS", payload: data})
                console.log({"ProductListScreen":data})
            }catch(err){
                dispatch({type: "FETCH_FAIL", payload: err.message});
                toast.error(err.message);
            }
        }
        fetchData()
    },[userInfo,page])
  return (
    <div className="container">
      <Helmet>
        <title>Product Lists</title>
      </Helmet>
      <Row>
        <Col>
          <h1 className="my-3">Products</h1>
        </Col>
        <Col className='col text-end my-3'>
            <Button variant='primary'>Create Product</Button>
        </Col>
      </Row>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products.map((x) => (
                <tr key={x._id}>
                  <td>{x._id}</td>
                  <td>{x.name}</td>
                  <td>{x.price}</td>
                  <td>{x.category}</td>
                  <td>{x.brand}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                key={x + 1}
                to={`/admin/productlist?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}