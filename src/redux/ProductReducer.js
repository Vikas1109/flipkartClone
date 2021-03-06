import { actionConstants } from "./Action";
import { loadData, saveData } from "../utils/localStorage";

const products = loadData("products") || [];
const cart = loadData("cart") || [];
const wishlist = loadData("wishlist") || [];

const initialState = {
  products: products,
  cart: cart,
  wishlist: wishlist,
  product: {},
  isLoading: true,
  isError: false,
};

export default function ProductReducer(state = initialState, action) {
  switch (action.type) {
    case actionConstants.GET_PRODUCTS_REQUEST:
      return { ...state, isLoading: true };
    case actionConstants.GET_PRODUCTS_SUCCESS:
      saveData("products", action.payload.products);
      return { ...state, products: action.payload.products, isLoading: false };
    case actionConstants.GET_SINGLE_PRODUCT:
      console.log(action.payload.product);
      return {
        ...state,
        product: action.payload.product,
        isLoading: false,
      };
    case actionConstants.GET_PRODUCTS_FAILURE:
      return { ...state, isError: true };
    case actionConstants.EMPTY_CART:
      return { ...state, cart: [] };
    case actionConstants.EMPTY_WISHLIST:
      return { ...state, wishlist: [] };
    case actionConstants.GET_CART:
      return { ...state, cart: action.payload.cart };
    case actionConstants.ADD_CART:
      if (Array.isArray(action.payload.cart)) {
        saveData("cart", action.payload.cart);
      } else {
        var res = [];
        res = [...res, action.payload.cart];
        saveData("cart", res);
      }

      return { ...state, cart: [...state.cart, action.payload.cart] };
    case actionConstants.ADD_WISHLIST:
      if (Array.isArray(action.payload.wishlist)) {
        saveData("wishlist", action.payload.wishlist);
      } else {
        var res2 = [];
        res2 = [...res2, action.payload.wishlist];
        saveData("wishlist", res2);
      }

      return {
        ...state,
        wishlist: [...state.wishlist, action.payload.wishlist],
      };
    case actionConstants.REMOVE_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionConstants.REMOVE_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case actionConstants.INCREMENT_ITEM:
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.id === action.payload.id
            ? { ...i, qty: i.qty + action.payload.qty }
            : i
        ),
      };
    case actionConstants.DECREMENT_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
        ),
      };

    default:
      return state;
  }
}
