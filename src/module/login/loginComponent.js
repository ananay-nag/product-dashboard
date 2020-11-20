import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
const LoginComponent = (props) => {
  return (
    <div className="display-flex width-50-p height-100vh display-flex" id="login-model">
      {Login(props)}
    </div>
  );
};
const Login = (props) => {
  const { setUser, state, addUser } = props;
  return (
    <div className="jc-space-around margin-auto login-model">
      <div className="jc-space-around margin-auto login-com display-grid m-t-50 m-b-20">
        <TextField id="name" label="Name" variant="outlined" value={state.name ? state.name : ""} onChange={(e) => setUser(e)} />
      </div>
      <div className="jc-space-around margin-auto login-com display-grid m-t-20 m-b-20">
        <TextField id="email" label="Email" variant="outlined" value={state.email ? state.email : ""} onChange={(e) => setUser(e)} />
      </div>
      <div className="jc-space-around margin-auto login-com display-grid m-t-20 m-b-20">
        <Button variant="contained" color="primary" onClick={addUser}>
          LOGIN
        </Button>
      </div>
      <Divider />
      {state.error ? <div className="jc-space-around margin-auto login-com display-grid m-t-50 m-b-20 c-FF0000">{state.error}</div> : ""}
    </div>
  );
};
export default LoginComponent;
