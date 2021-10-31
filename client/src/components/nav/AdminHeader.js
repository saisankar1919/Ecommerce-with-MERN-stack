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
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
// import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsShopWindow } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";

const { SubMenu, Item } = Menu;

const AdminHeader = () => {
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
    <div style={{backgroundColor: '#ebebeb!important'}}>
      <>
        <Navbar
          collapseOnSelect
          fixed="top"
          expand="sm"
          bg="light"
          varient="light"
        >
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav style={{ width: "100%" }} onClick={handleClick}>
                <Nav.Link>
                  <h4>Brand 24</h4>
                </Nav.Link>

                <Nav></Nav>

                {/* <Nav.Link key="shop">
                  <Link to="/shop">
                    <BsShopWindow style={{ fontSize: "25px",marginLeft:'20px',color:'rgb(87, 67, 67)' }} />
                  </Link>
                </Nav.Link> */}
              </Nav>
              <Nav className="justify-content-end">
                {user && user.role === "subscriber" && (
                  <span
                    className="float-right p-1"
                    style={{ marginRight: "50px" }}
                  >
                    <Search />
                  </span>
                )}

                {user && (
                  <NavDropdown
                    title={user.email && user.email.split("@")[0]}
                    className="float-right"
                    variant="outline"
                    drop={"down"}
                  >
                    {user && user.role === "subscriber" && (
                      <Nav.Link>
                        <Link to="/user/history" style={{color:'rgb(87, 67, 67)'}}>Profile</Link>
                      </Nav.Link>
                    )}

                    {user && user.role === "admin" && (
                      <Nav.Link>
                        <Link to="/admin/dashboard" style={{color:'rgb(87, 67, 67)'}}>Dashboard</Link>
                      </Nav.Link>
                    )}

                    <Nav.Link onClick={logout} style={{color:'rgb(87, 67, 67)'}}>
                      Logout
                    </Nav.Link>
                  </NavDropdown>
                )}

                {user && user.role === "subscriber" && (
                  <Nav.Link>
                    <Link to="/cart">
                      <Badge count={cart.length} offset={[9, 0]}>
                        <FiHeart style={{ fontSize: "25px",color:'rgb(87, 67, 67)' }} />
                      </Badge>
                    </Link>
                  </Nav.Link>
                )}

                {user && user.role === "subscriber" && (
                  <Nav.Link>
                    <Link to="/cart">
                      <Badge count={cart.length} offset={[9, 0]}>
                        <HiOutlineShoppingBag style={{ fontSize: "25px",color:'rgb(87, 67, 67)' }} />
                      </Badge>
                    </Link>
                  </Nav.Link>
                )}

                {!user && (
                  <Nav.Link
                    key="register"
                    icon={<UserAddOutlined />}
                    className="float-right"
                  >
                    <Link to="/register"style={{color:'rgb(87, 67, 67)'}}>Register</Link>
                  </Nav.Link>
                )}

                {!user && (
                  <Nav.Link
                    key="login"
                    icon={<UserOutlined />}
                    className="float-right"
                  >
                    <Link to="/login"style={{color:'rgb(87, 67, 67)'}}>Login</Link>
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
      {/* <div style={{padding:'10px',fontFamily:'revert', backgroundColor:'rgb(116 129 138)'}}>
         

    </div> */}
      {/* <Menu
        onClick={handleClick}
        style={{ backgroundColor: "rgb(116 129 138)", padding: "10px" }}
        mode="horizontal"
      >
        <Item>
          <Link style={{ fontFamily: "sans-serif" }} to="/">
            <h4>Brand 24</h4>{" "}
          </Link>
        </Item>
        {/* <Item key="home" icon={<AppstoreOutlined />}> */}

        {/* </Item> */}

        {/* <Item key="shop">
          <Link style={{ fontSize: "15px" }} to="/shop">
            <ShoppingOutlined />
          </Link>
        </Item> */}

        {/* <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item> */}

        {/* {user && user.role === "subscriber" && (
          <Item key="cart" className="float-right">
            <Link style={{ margin: "5px" }} to="/cart">
              <Badge count={cart.length} offset={[9, 0]}>
                <ShoppingCartOutlined style={{ fontSize: "30px" }} />
              </Badge>
            </Link>
          </Item>
        )} */}

        {/* {!user && (
          <Item
            key="register"
            icon={<UserAddOutlined />}
            className="float-right"
          >
            <Link to="/register">Register</Link>
          </Item>
        )} */}

        {/* {!user && (
          <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login">Login</Link>
          </Item>
        )} */}

        {/* {user && (
          <SubMenu
            icon={<SettingOutlined />}
            title={user.email && user.email.split("@")[0]}
            className="float-right"
          >
            {user && user.role === "subscriber" && (
              <Item>
                <Link to="/user/history">Profile</Link>
              </Item>
            )} */}

            {/* {user && user.role === "admin" && (
              <Item>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )} */}
{/* 
            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )} */}

        {/* {user && user.role === "subscriber" && (
          <span className="float-right p-1">
            <Search />
          </span>
        )}
      </Menu> */} 
    </div>
  );
};

export default AdminHeader;
