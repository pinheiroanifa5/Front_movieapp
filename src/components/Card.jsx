import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import ReactPlayer from 'react-player/youtube';

export default React.memo(function Card({ movieData }) {
  const [onHovered, setOnHovered] = useState(false);
  const navigate = useNavigate();


  return (
    <CardContainer
      onMouseEnter={() => setOnHovered(true)}
      onMouseLeave={() => setOnHovered(false)}
    >
      <img
        src={movieData.image}
        width={150}
        height={150}
        alt="movie poster"
        onClick={() => navigate("/player")}
      />
      {onHovered && (
        <div className="hover">
          <div className="image-video-wrapper">
            <ReactPlayer url={movieData.trailer} playing={true} />
          </div>
          <div className="info-container">
            <h3 className="movieName" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons">
              <div className="controls">
                <IoPlayCircleSharp
                  title="play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title="like" />
                <RiThumbDownFill title="Dis like" />
                <BsCheck title="Remove from  List" />
                <AiOutlinePlus title="Add to my List" />
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
            <div className="genres">
              <ul>
                {movieData.category}
              </ul>
            </div>
          </div>
        </div>
      )}
    </CardContainer>
  );
});

const CardContainer = styled.div`
  margin-top: 1rem;
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;


  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;

  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.2rem;
    border: 0.1rem solid gray;
    background-color: #120c0c;
    transition: 0.3s ease-out;
    .image-video-wrapper {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
    }
    .info-container {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      gap: 0.5rem;
      .movieName {
        color: #8a4646;
      }
    }
    .icons {
      display: flex;
      justify-content: space-between;
      .controls {
        display: flex;
        gap: 0.5rem;
      }

      svg {
        color: #f5f1f1;
        border: 0.1rem solid white;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #522222;
        }
      }
    }
    .genres {
      display: flex;
      color: #f3f3f3;
      ul {
        display: flex;
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
