import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Page.scss";

const Page = () => {
  return (
    <div>
      <div className="background-home"></div>
      <div className="message">
        <section className="section">
          <div className="masthead-image" id="master-container">
            <div className="content center">
              <h1 id="master">
                <div>Your</div>
                <div id="master-container-scroller">
                  <div className="master-container-scroller_item">
                    <Link to="" className="cta-link">
                      Favorite
                    </Link>
                  </div>
                  <div className="master-container-scroller_item">
                    <Link to="" className="cta-link">
                      Classical
                    </Link>
                  </div>
                  <div className="master-container-scroller_item">
                    <Link to="" className="cta-link">
                      Sunday
                    </Link>
                  </div>
                  <div className="master-container-scroller_item">
                    <Link to="" className="cta-link">
                      Anime
                    </Link>
                    .
                  </div>
                  <div className="master-container-scroller_item">
                    <Link to="" className="cta-link">
                      Happy
                    </Link>
                    .
                  </div>
                  <div className="master-container-scroller_item">
                    <Link to="" className="cta-link">
                      Memoriable
                    </Link>
                    .
                  </div>
                  <div className="master-container-scroller_item">
                    <Link to="" className="cta-link">
                      Japanese
                    </Link>
                    .
                  </div>
                  <div className="master-container-scroller_item">
                    <Link to="" className="cta-link">
                      Best
                    </Link>
                  </div>
                  <div className="master-container-scroller_item">
                    <Link to="" className="cta-link">
                      unfogettable
                    </Link>
                  </div>
                  <div className="master-container-scroller_item">Friend's</div>
                </div>
                <div>Movie List</div>
              </h1>
            </div>
          </div>
        </section>
        <div className="watch-button">
        <Link to="/home" className="cta-link"><button>Watch</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
