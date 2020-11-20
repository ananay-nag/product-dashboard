import React, { Component } from "react";
import ProductComponent from "./productComponent";
import { connect } from "react-redux";
import { dispatchAction } from "../../util";
import { STORE_CONSTANT } from "../../common/index";
import { localStore } from "../../localStore";
import { history } from "../../util/history";

class ProductDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdd: false,
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      image: "",
      error: "",
      user: {},
      productList: [],
    };
  }
  componentDidMount() {
    this.isLogin();
  }
  componentWillMount() {
    this.isLogin();
  }
  //get user is already login
  isLogin = () => {
    let user = localStore.get(STORE_CONSTANT.LOCALSTORE.USER);
    //decript data
    if (user) user = JSON.parse(window.atob(user));
    //check validation by valid amail
    if (!user || !user.email) history.push("/login");
    else {
      this.setState({ user: user });
      history.push("/dashboard");
    }
  };
  logout = () => {
    if (localStore.remove(STORE_CONSTANT.LOCALSTORE.USER)) history.push("/login");
    else history.push("/dashboard");
  };
  //validate email
  valiadteEmail(email) {
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email.trim());
  }
  addProduct = () => {
    if (!this.validValues()) return false;
    let addNew = this.props.productList ? this.props.productList : [];
    addNew.push({
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      quantity: this.state.quantity,
      image: this.state.image,
    });
    
    this.props.dispatchAction(STORE_CONSTANT.STORE.PRODUCT.ADD_ITEM, addNew);
    this.toggleForm(false);
    this.setState({ productList: this.props.productList });
  };
  
  // validate values.
  validValues = () => {
    const { name, price, quantity } = this.state;
    if (!name || !name.trim().length) {
      this.setState({ error: "Enter name" });
      return false;
    } else if (!price || !price.trim().length || isNaN(price)) {
      this.setState({ error: "Enter price in numeric." });
      return false;
    } else if (!quantity || !quantity.trim().length || isNaN(quantity)) {
      this.setState({ error: "Enter price in numeric." });
      return false;
    } else {
      this.setState({ error: "" });
      return true;
    }
  };
  toggleForm = (value) => {
    this.setState({ isAdd: value, name: "", description: "", price: 0, quantity: 0, image: "", error: "" });
  };
  fillValues = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value.trim() });
  };
  render() {
    return (
      <ProductComponent
        setText={this.setText}
        addProduct={this.addProduct}
        toggleForm={this.toggleForm}
        state={this.state}
        productList={this.props.productList}
        fillValues={this.fillValues}
        logout={this.logout}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    productList: state.addProduct.productList,
  };
};
export default connect(mapStateToProps, { dispatchAction })(ProductDashboard);
