import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DefaltItem = () => {
  return (
    <div className="width-100-p display-flex m-t-5" style={{ background: "rgba(255,255,255,0.5)" }}>
      <div className="m-5 width-100-p txt-align-center">
        <span className="c-ffffff m-5 txt-align-center">No more product</span>
      </div>
    </div>
  );
};
const ProductComponent = (props) => {
  // console.log(props);
  const { toggleForm, state, logout } = props;
  return (
    <div className="width-100-p m-20" style={{ background: "rgba(255,255,255,0.2)" }}>
      <div className="m-5 display-flex jc-space-around width-100-p c-FFFFFF fw-600 fs-20">
        <div className="width-75-p txt-align-center">Product Dashboard</div>
        <div onClick={() => toggleForm(!state.isAdd)} className="cr-pointer">
          Add Product
        </div>
        <div className="cr-pointer" title={state.user.name + " | " + state.user.email}>
          {state.user.name}
        </div>
        <div className="cr-pointer" onClick={logout}>
          Logout
        </div>
      </div>
      <div
        className="m-t-50 display-flex jc-space-around width-100-p c-FFFFFF fw-600 fs-20"
        style={{ flexFlow: "wrap", overflowY: "auto", maxHeight: "85vh" }}
      >
        {state.productList && state.productList.length ? (
          state.productList.map((item) => {
            return <ShowProduct item={item} />;
          })
        ) : (
          <DefaltItem />
        )}
        {AppProdcut(props)}
      </div>
    </div>
  );
};
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    background: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/NBC_Peacock_1986.svg/567px-NBC_Peacock_1986.svg.png')",
    "background-size": "cover",
    "background-position": "center",
  },
});
const ShowProduct = (props) => {
  console.log("--------------", props);
  // props = props.props;
  const { item } = props;
  function defaultImage(img) {
    // img.src = "default.gif";
  }
  const classes = useStyles();
  return (
    <Card className={classes.root + " m-20"} style={{ minWidth: 300 }}>
      <CardActionArea>
        <CardMedia className={classes.media} image={item.image} title="Contemplative Reptile" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {item.price}
        </Button>
        <Button size="small" color="primary">
          {item.quantity}
        </Button>
      </CardActions>
    </Card>
  );
};
const AppProdcut = (props) => {
  const { toggleForm, state, fillValues, addProduct } = props;
  return (
    <Dialog open={state.isAdd} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Add New Product</DialogTitle>
      <DialogContent>
        <DialogContentText id="product-des">Enter Product Description</DialogContentText>
        <div className="m-t-50 display-flex jc-space-around width-100-p" style={{ flexFlow: "wrap" }}>
          <TextField id="name" label="Name" variant="outlined" required onChange={(e) => fillValues(e)} />
          <TextField id="description" label="Description" variant="outlined" onChange={(e) => fillValues(e)} />
          <TextField id="price" label="Price" variant="outlined" required onChange={(e) => fillValues(e)} />
          <TextField id="quantity" label="Quantity" variant="outlined" required onChange={(e) => fillValues(e)} />
          <TextField id="image" label="Image Url" variant="outlined" onChange={(e) => fillValues(e)} />
        </div>
        {state.error ? (
          <div className="m-t-50 display-flex jc-space-around width-100-p c-FF0000" style={{ flexFlow: "wrap" }}>
            {state.error}
          </div>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button color="primary" autoFocus onClick={() => toggleForm(!state.isAdd)}>
          close
        </Button>
        <Button color="primary" autoFocus onClick={addProduct}>
          add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ProductComponent;
