import React , {useState} from "react";
import { Container, AppBar, Typography, Grow, Grid, Toolbar, Avatar, Button } from "@material-ui/core";
import useStyles from "./styles.js";
import memories from "../../images/newLogo.png";
import text from '../../images/text.png'
import {Link} from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from "react-router";
import decode from 'jwt-decode';


export default function Navbar() {
  const classes = useStyles();
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

    console.log(user)
    
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logout = ()=>{
    dispatch({type:'LOGOUT'})
    history.push('/')
    setUser(null)

  }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to = "/" className={classes.brandContainer}>
      <img className = {classes.image} src = {text} alt = "icon" height = "40px"/>
      <img  src = {memories} alt = "icon" height = "45px"/> 
      </Link>
      <Toolbar className = {classes.toolbar}>
      {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
