import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopNav from "../components/TopNav";
import SliderContainer from "../components/SliderContainer";
import { getAllMovies } from "../store/reducers/NetflixSlice";
import { getMe } from "../store/reducers/UsersSlice";
import ReactPlayer from "react-player";

const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getAllMovies(token)).then(() => dispatch(getMe(token)));
    }
  }, [token, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset !== 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <HeroContainer>
      <div className="hero">
        <TopNav isScrolled={isScrolled} />
        <Slider {...settings}>
          {movies.map((movie, index) => (
            <div key={index} className="slide">
              < ReactPlayer url={movies[Math.floor(Math.random() * movies.length)].trailer} playing={true} width="100%" />
              <div className="container">
                <div className="title">
                  <h1>{movie.title}</h1>
                  <p>{movie.description}</p>
                </div>
                <div className="buttons">
                  <button onClick={() => navigate("/player")} className="playBtn">
                    Play
                  </button>
                  <button onClick={() => navigate("/details")} className="moreBtn">
                    More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <SliderContainer movies={movies} />
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  .hero {
    position: relative;
    .background-image {
      filter: brightness(100%);
      height: 100vh;
      width: 100%;
      object-fit: cover;
      
    }
    .container {
      position: absolute;
      bottom: 1rem;
      
      
    
      .title {
        h1 {
          margin-left: 5rem;
          text-transform: uppercase;
          font-size: 73px;
          background: -webkit-linear-gradient(#e6e2e2, rgb(128, 13, 13));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          margin-bottom: -50px;
          width: 80%;
          margin-left: 5rem;
          font-family: "lexend Deca", sans-serif;
          color: #ad9292;
        }
      }
      .buttons {
        display: flex;
        margin: 5rem;
        gap: 2rem;
      }
      .playBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
        border-radius: 1rem;
        font-size: 1.4rem;
        gap: 1rem;
        padding: 0.9rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: none;
        cursor: pointer;
      }
      .moreBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: black;
        border-radius: 1rem;
        font-size: 1.4rem;
        gap: 1rem;
        padding: 0.9rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: 0.1rem solid white;
        cursor: pointer;
      }
      
    }
  }
`;

export default Netflix;
