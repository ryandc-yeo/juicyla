import React, { useState } from "react";
import "./NavBar.css";
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { auth } from "./firebase";
import { useUserAuth } from "./UserAuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  let navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const { logOut } = useUserAuth();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  window.addEventListener("scroll", changeBackground);
  return (
    <div className={navbar ? "nav active headerBar" : "nav headerBar"}>
      <div className="topBar buttonGroup">
        <div className="title buttonLeft leftSpace5">
          <Link
            className="text-white"
            to="/"
            style={{ textDecoration: "none" }}
          >
            JUICYLA
          </Link>
        </div>
        <div className="buttonRight">
          {/* { console.log(auth.currentUser) } */}
          {/* { auth.currentUser ? console.log("logged in") : console.log("logged out")} */}
          {auth.currentUser ? (
            <div>
              <span className="mr-4 textShadow rightSpace10">
                {auth.currentUser.email}{" "}
              </span>
              <Button id="backButton"
                variant="contained"
                onClick={handleLogout}

                sx={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serifs',
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: '#EA4033',
                  backgroundColor: "white",
                  '&:hover': {
                    backgroundColor: 'white',
                  }
                }}
              >
                Sign Out
              </Button>
            </div>
          ) : (


            <div className="rightSpace5">
              <Button id="backButton"
                variant="contained"
                onClick={
                  () => { navigate('/Signup') }
                }

                sx={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serifs',
                  fontWeight: 'bold',
                  fontSize: 15,
                  right: 20,
                  color: '#F2F2F0',
                  backgroundColor: "#EA4033",
                  '&:hover': {
                    backgroundColor: '#EA4033',
                  }
                }}
              >
                {" "}
                Register{" "}
              </Button>
              <Button id="backButton"
                variant="contained"
                onClick={
                  () => { navigate('/Login') }
                }

                sx={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serifs',
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: '#EA4033',
                  backgroundColor: "white",
                  '&:hover': {
                    backgroundColor: 'white',
                  }
                }}
              >
                Sign in
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
