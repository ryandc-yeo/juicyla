import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import StarRating from './Components/StarRating';
import ReviewRating from "./Components/ReviewRating";
import WriteReviews from './Components/WriteReviews';
import MenuComponent from './Components/MenuComponent.js';
import ActivityLevel from './Components/ActivityLevel.js';
import DisplayReviews from './Components/DisplayReviews';
import { auth } from './firebase';
import "./RestaurantPage.css";
import { onValue, getDatabase, ref } from "firebase/database";

export default function Restaurant() {
  const db = getDatabase();
  const navigate = useNavigate();
  const location = useLocation();

  if (location.state === null) {
    return (
      <div>
        <h1>Please return to the homepage and choose a dining hall.</h1>
        <Button id="photoAdd" variant="contained"
          sx={{
            fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serifs',
            fontWeight: 'bold',
            fontSize: 15,
            width: 150,
            color: '#F2F2F0',
            backgroundColor: "transparent",
            border: 1,
            borderColor: "white",
            marginLeft: '2%',

            '&:hover': {
              backgroundColor: '#868686',
            }
          }}
          onClick={
            () => { navigate('/') }
          }
        >
          Return to HomePage
        </Button>
      </div>
    )
  }

  const diningHallName = location.state.name;
  const isMealPeriod = location.state.isMealPeriod;
  const [liveRating, setLiveRating] = useState(location.state.liveRating);
  const [userArr, setUserArr] = useState([]);

  let dbRef = ref(db, 'written reviews' + '/' + diningHallName);

  const [show, setShow] = React.useState(false)
  const handleShow = () => {
    setShow(!show);
  }
  useEffect(() => {
    //get reviews
    onValue(dbRef, (snapshot) => {
      let userArrTemp = [];
      snapshot.forEach((childSnapshot) => {
        let userObj = {
          user: childSnapshot.val().name,
          rating: childSnapshot.val().rating,
          review: childSnapshot.val().review,
        };
        userArrTemp.push(userObj);
      });
      setUserArr(userArrTemp);
    })

    //get star ratings
    dbRef = ref(db, 'ratings' + '/' + diningHallName + "/rating");
    let num = 0;
    onValue(dbRef, (snapshot) => {
      num = snapshot.val();
      setLiveRating(num)
      console.log(liveRating)
    });

  }, []);
  console.log(userArr)
  function Menu() {
    return (
      <div>

        <div id="MenuHolder" s>
          <div className="menutitle">
            <h1 id="menuName"><b>MENU</b></h1>
            <div id="stars" className="star-rating">
              <StarRating hallName={diningHallName} isMealPeriod={isMealPeriod} />
            </div>
          </div >


          <div id="menuCols">
            <div className="col"><MenuComponent restaurant={diningHallName} /></div>
            {/* <div className="col"></div> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="all">
      <div id="header">
        <div id="headerInfo">
          <h1 id="name"><b>{diningHallName}</b></h1>
          <div id="header2">
            <div className='restRating'>
              {isMealPeriod ?
                <div className='live'>
                  <p className='liveTitle'>Live Rating: </p>
                  <Rating
                    value={liveRating}
                    readOnly
                  />
                </div>
                :
                <></>}

              <ReviewRating userArr={userArr} />
            </div>
            <div id="activity">
              {isMealPeriod ? <>
                <p>ACTIVITY:</p>
                <ActivityLevel restaurant={diningHallName} />
              </>
                :
                <p>No activity level: not a meal period</p>
              }
            </div>
          </div>
          <div className='times'>
            <p>BREAKFAST:<br /> 7:00am - 10:00am </p>
            <p> LUNCH:<br /> 11:00am - 3:00pm </p>
            <p> DINNER: <br />5:00pm - 9:00pm</p>
          </div>

        </div>


        <Button id="photoAdd" variant="contained"
          sx={{
            fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serifs',
            fontWeight: 'bold',
            fontSize: 15,
            width: 150,
            color: '#F2F2F0',
            backgroundColor: "transparent",
            border: 1,
            borderColor: "white",
            marginLeft: '2%',

            '&:hover': {
              backgroundColor: '#868686',
            }
          }}
          onClick={
            () => { navigate('/PhotoGallery ', { state: { name: location.state.name } }) }
          }
        >

          PHOTOS
        </Button>
      </div>
      {/* <div id="bruh">a</div> */}

      <div id="lower">
        <div id="bottom">
          <div id="menu">
            {show ? <WriteReviews hallName={diningHallName} /> : <Menu />}
          </div>

          <div id="reviews">
            <div id="reviewTop">
              <div>
                {auth.currentUser ? <Button
                  variant="contained"
                  onClick={() => handleShow()}
                  sx={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serifs',
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: '#F2F2F0',
                    backgroundColor: "transparent",
                    border: 1,
                    borderColor: "white",

                    '&:hover': {
                      backgroundColor: '#868686',
                    }
                  }}
                >{show ? "Back to Menu" : "Add Review"}</Button>
                  : <Button
                    variant="contained"
                    disabled
                    sx={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serifs',
                      fontWeight: 'bold',
                      fontSize: 15,
                      color: '#F2F2F0',
                      backgroundColor: "transparent",
                      border: 1,
                      borderColor: "white",

                      '&:hover': {
                        backgroundColor: '#868686',
                      }
                    }}
                  >Login to leave a Review</Button>}

              </div>
              <h1>
                <b>REVIEWS</b>
              </h1>
            </div>
            <div id="reviewHolder">

              <DisplayReviews userArr={userArr} />
            </div>
            <div id="reviewFooter"></div>
          </div>
        </div>

        <div id="footer">
          <Button id="backButton"
            variant="contained"
            onClick={
              () => { navigate('/') }
            }

            sx={{
              fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serifs',
              fontWeight: 'bold',
              fontSize: 15,
              color: '#F2F2F0',
              backgroundColor: "#EA4033",
              '&:hover': {
                backgroundColor: '#EA4033',
              }
            }}
          >
            Back to ratings
          </Button>
        </div>
      </div>
    </div>
  );
}

