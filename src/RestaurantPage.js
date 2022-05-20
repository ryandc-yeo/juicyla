import React from 'react';
import "./RestaurantPage.css";

class Review extends React.Component {
  render() {
    return (
      <div className="review">
                <div id="reviewHeader">
                  <img
                    src={require("./images/bqmfbsn2fpw51.jpeg")}
                    alt="profilePicture"
                    class="pp"
                  ></img>
                  <div className="reviewName">
                    <p>Username </p>
                    <div id="stars2">
                      <img
                        src={require("./images/star.png")}
                        className="star2"
                      ></img>
                      <img
                        src={require("./images/star.png")}
                        className="star2"
                      ></img>
                      <img
                        src={require("./images/star.png")}
                        className="star2"
                      ></img>
                      <img
                        src={require("./images/star.png")}
                        className="star2"
                      ></img>
                      <img
                        src={require("./images/star.png")}
                        className="star2"
                      ></img>
                    </div>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor si gt amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                </p>
              </div>
    )
  }
}

class Menu extends React.Component {
  render() {
    return (
      <div>
        <h1 id="menuName">MENU</h1>
        <div id="menuCols">
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>
    );
  }
}

class WriteReview extends React.Component {
  render() {
    return (
      <div>
        <h1 id="menuName">WRITE REVIEW</h1>
        <form>
          <textarea rows="5" cols="50" id="TITLE"></textarea>
        </form>
        <div id="submitRev">
          <div>
            <img src={require("./images/star.png")} className="star3"></img>
            <img src={require("./images/star.png")} className="star3"></img>
            <img src={require("./images/star.png")} className="star3"></img>
            <img src={require("./images/star.png")} className="star3"></img>
            <img src={require("./images/star.png")} className="star3"></img>
          </div>
          <button>
            <b>DELETE REVIEW</b>
          </button>
          <button>
            <b>POST REVIEW</b>
          </button>
        </div>
      </div>
    ); 
  }
}

export default function Restaurant() {
    return (
      <div id="all">
        <div id="header">
          <div id="headerInfo">
            <h1 id="name">NAME OF HALL</h1>
            <div id="header2">
              <div id="stars">
                <img src={require("./images/star.png")} className="star"></img>
                <img src={require("./images/star.png")} className="star"></img>
                <img src={require("./images/star.png")} className="star"></img>
                <img src={require("./images/star.png")} className="star"></img>
                <img src={require("./images/star.png")} className="star"></img>
              </div>

              <div id="activity">
                <p>ACTIVITY:</p>
                <img
                  src={require("./images/bar.jpg")}
                  className="statusBar"
                ></img>
              </div>
            </div>

            <p>HOURS: 7:00 - 10:00</p>
          </div>

          <button id="photoAdd">
            <b>ADD PHOTOS</b>
          </button>
        </div>
        <div id="bruh">a</div>

        <div id="lower">
          <div id="bottom">
            <div id="menu">
              <WriteReview />
            </div>

            <div id="reviews">
              <div id="reviewTop">
                <button>
                  <b>ADD REVIEW</b>
                </button>
                <h1>
                  <b>REVIEWS</b>
                </h1>
              </div>
              <Review />
              <Review />
              <Review />
              <Review />
              <Review />
              <Review />
              <Review />
            </div>
          </div>

          <div id="footer">
            <button id="backButt">
              <b>Back to ratings</b>
            </button>
          </div>
        </div>
      </div>
    );
}
