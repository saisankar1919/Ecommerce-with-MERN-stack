import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";
import { Navbar, Nav, Container } from 'react-bootstrap-validation';
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (

    

  <div>
    <>
    <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' varient='dark'>
      <Container>
        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
        <NavbarCollapse>
          
        </NavbarCollapse>
      </Container>
    </Navbar>

    </>
    {/* <div style={{padding:'10px',fontFamily:'revert', backgroundColor:'rgb(116 129 138)'}}>
         

    </div> */}
    <Menu onClick={handleClick} style={{backgroundColor:'rgb(116 129 138)',padding:'10px'}} selectedKeys={[current]} mode="horizontal">
      <Item>
         <Link style={{fontFamily:'sans-serif'}} to="/"><h4>Brand 24</h4> </Link>
      </Item>
      {/* <Item key="home" icon={<AppstoreOutlined />}> */}
        
      {/* </Item> */}

      <Item key="shop">
        <Link style={{fontSize:'15px'}} to="/shop"><ShoppingOutlined /></Link>
      </Item>

      {/* <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item> */}

     {user && user.role === "subscriber" &&( <Item key="cart" className="float-right">
        <Link style={{margin:'5px'}} to="/cart">
        <Badge count={cart.length} offset={[9, 0]}>
        <ShoppingCartOutlined style={{fontSize:'30px'}}/>
          </Badge>
          
        </Link>
      </Item>)
      }

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">Profile</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
     
      {user && user.role === "subscriber" &&
      (<span className="float-right p-1">
        <Search />
      </span>)
      }
    </Menu>
  </div>
    
  );
};

export default Header;
