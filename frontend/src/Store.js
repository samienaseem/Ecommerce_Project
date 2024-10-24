import { createContext, useReducer } from "react";

export const Store=createContext();

function reducer(state,action){
    switch (action.type) {
      case 'CART_ADD_ITEM':
        const newItem=action.payload;
        const existItem=state.cart.cartItems.find((x)=> x._id===newItem._id)
        const cartItems = existItem 
        ? state.cart.cartItems.map((item)=>
            item._id===existItem._id ? newItem : item
        )
        : [...state.cart.cartItems,newItem]
        console.log({'fromContext':cartItems,'ExistingItem':existItem})
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
        return{
            ...state,
            cart:{
                ...state.cart,
                cartItems
            }
        }  
        // return {
        //   ...state, // Keep the rest of the state unchanged
        //   cart: {
        //     ...state.cart, // Keep other cart properties (if any) unchanged
        //     cartItems: [...state.cart.cartItems, action.payload], // Add new item to cartItems
        //   },
        // };
        case 'CART_REMOVE_ITEM':{
            const cartItems=state.cart.cartItems.filter((item)=>item._id !== action.payload._id);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return {
                ...state,
                cart :{
                    ...state.cart,
                    cartItems
                }
            }
        }
        case 'USER_SIGNIN':{
            return {
                ...state,
                userInfo: action.payload
            };
        }
        case 'USER_SIGNOUT':{
            return {
                ...state,
                userInfo: null,
                cart:{
                    cartItems:[],
                    shippingAddress:{},
                    paymentMethod: ''
                }
            }
        }
        case 'SAVE_SHIPPING_ADDRESS':{
            return {
                ...state,
                cart:{
                    ...state.cart,
                    shippingAddress: action.payload
                }
            }
        }
        case "SAVE_PAYMENT_METHOD": {
            return{
                ...state,
                cart:{
                    ...state.cart,
                    paymentMethod: action.payload
                }
            }
        }
        case "CART_CLEAR":{
            return{
                ...state,
                cart:{
                    ...state.cart,
                    cartItems:[]
                }
            }
        }
      default:
        return state;
    }
}
const initialState={
    userInfo : localStorage.getItem('userInfo')?
        JSON.parse(localStorage.getItem('userInfo')):null,
    cart : {
        shippingAddress: localStorage.getItem('shippingAddress')?
        JSON.parse(localStorage.getItem('shippingAddress')):{},

        cartItems:localStorage.getItem('cartItems')?
        JSON.parse(localStorage.getItem('cartItems')):[],

        paymentMethod: localStorage.getItem('paymentMethod')?
        localStorage.getItem('paymentMethod'): '',
    }
}

export const StoreProvider=({children})=>{
    // const [count,setCount]=useState(0)
    const[state,dispatch]=useReducer(reducer,initialState)

    return(

        <Store.Provider value={{state, dispatch }}>
            {children}
        </Store.Provider>

    );
}
