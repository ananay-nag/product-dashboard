import { STORE_CONSTANT } from "../common";

let initialState = {
  productList: [],
};
export default function addProduct(state = initialState, action) {
  switch (action.type) {
    case STORE_CONSTANT.STORE.PRODUCT.ADD_ITEM:
      return { ...state, productList: action.data };
    default:
      return state;
  }
}
