import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import ReactPlayer from 'react-player/youtube';
import { BiChevronDown } from "react-icons/bi";

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
          <div className="info-container">
            <h3 className="movieName" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="category">
              {movieData.category}
            </div>
            <div className="icons">
              <div className="controls">
                <IoPlayCircleSharp
                  title="Play Movie"
                  onClick={() => navigate("/player")}
                />
                <AiOutlinePlus title="Add to My List" />
                <AiOutlineEdit title="Edit" />
              </div>
              <div className="info">
                <BiChevronDown title="More Info" />
              </div>
            </div>
          </div>
          <div className="creator-info">
            {"Adicionado por: " + movieData.creator.name}
          </div>
        </div>
      )}
    </CardContainer>
  );
});

const CardContainer = styled.div`
  margin-top: 1rem;
  max-width: 250px;
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
    height: 55%;
    width: 25rem;
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
      
    }
    .info-container {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      gap: 0.5rem;
      .movieName {
        color: white;
      }
      .category {
        color: #f3f3f3;
        font-size: 0.9rem;
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
          color: #d72d2d;
        }
      }
    }
    .creator-info {
      color: white;
      text-align: right;
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      font-size: 0.8rem;
    }
  }
`;
