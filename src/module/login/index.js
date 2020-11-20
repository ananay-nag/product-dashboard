import React, { Component } from "react";
import LoginComponent from "./loginComponent";
import { STORE_CONSTANT } from "../../common/index";
import { localStore } from "../../localStore";
import { history } from "../../util/history";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      error: "",
    };
  }
  componentDidMount() {
    this.isLogin();
  }
  componentWillMount() {
    this.isLogin();
  }

  // add user to local Store
  addUser = () => {
    if (this.state.name && this.state.name.length && this.state.email && this.valiadteEmail(this.state.email)) {
      let user = {
        name: this.state.name,
        email: this.state.email,
      };
      // console.log("SET ", user);
      user = window.btoa(JSON.stringify(user));
      if (localStore.set(STORE_CONSTANT.LOCALSTORE.USER, user)) {
        history.push("/dashboard");
      }
    } else {
      this.setState({ error: "failed to add user" });
      history.push("/login");
    }
  };

  //get user is already login
  isLogin() {
    let user = localStore.get(STORE_CONSTANT.LOCALSTORE.USER);
    //decript data
    if (user) user = JSON.parse(window.atob(user));
    //check validation by valid amail
    if (!user || !user.email) {
      history.push("/login");
    } else {
      history.push("/dashboard");
    }
  }
  //validate email
  valiadteEmail(email) {
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email.trim());
  }

  //set user data to state
  setUser = (event) => {
    const { id, value } = event.target;
    if (value.trim().length) this.setState({ [id]: value.trim() });
  };
  render() {
    // console.log(this.props);
    return <LoginComponent state={this.state} setUser={this.setUser} addUser={this.addUser} />;
  }
}
export default Login;
