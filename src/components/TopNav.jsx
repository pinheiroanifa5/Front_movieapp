import React, { useEffect, useState } from "react";
import { AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllMovies } from "../store/reducers/NetflixSlice";

const TopNav = ({ isScrolled }) => {
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const navlinks = [
    { name: "Home", link: "/" },
    { name: "Movies", link: "/movies" },
    { name: "AddMovie", link: "/AddMovie" },
    { name: "My List", link: "/mylist" },


  ];

  const navigate = useNavigate();
  const SignOut = () => {
    console.log("Até a próxima!");
    navigate('/login');
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      dispatch(getAllMovies(token, searchTerm));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <NavContainer>
      <nav className={`${isScrolled ? "scrolled" : "notScroll"}`}>
        <div className="leftSide">
          <div className="logo">
            <img
              src="/N-sFlix-09-05-2024 (1).png"
              alt="logo"
            />
          </div>
          <ul className="links">
            {navlinks.map(({ name, link }) => (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="middleSide">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchClick}>
            <AiOutlineSearch />
          </button>
        </div>

        <div className="rightSide">
          <button onClick={SignOut}>
            <AiOutlineLogout />
          </button>
        </div>
      </nav>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  .notScroll {
    display: flex;
  }
  .scrolled {
    display: flex;
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0.4rem;
    align-items: center;
    transition: 0.3s ease-in;
    
    .leftSide {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-left: 5rem;

      .logo {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      img {
        width: 10rem;
        height: 2rem;
      }
    }

    .links {
      display: flex;
      list-style-type: none;
      gap: 3rem;
      
      li {
        a {
          color: white;
          text-decoration: none;
        }
      }
    }

    .middleSide {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      input {
        width: 50%;
        padding: 0.5rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        margin-right: 0.5rem;
      }

      button {
        background: none;
        border: none;
        cursor: pointer;

        svg {
          color: white;
          font-size: 1.5rem;
        }
      }
    }
  }

  .rightSide {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-right: 1rem;

    button {
      background-color: red;
      border: none;
      cursor: pointer;
      border-radius: 50%;
    }

    &:focus {
      outline: none;
    }

    svg {
      color: white;
      font-size: 2rem;
    }
  }

  .search-results {
    position: absolute;
    top: 6rem;
    width: 100%;
    background-color: black;
    color: white;
    padding: 1rem;
    
    .movie-item {
      margin-bottom: 1rem;

      h2 {
        margin: 0;
        font-size: 1.5rem;
      }

      p {
        margin: 0.5rem 0 0;
      }
    }
  }
`;

export default TopNav;
