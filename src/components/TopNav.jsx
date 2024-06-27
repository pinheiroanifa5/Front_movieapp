import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../store/reducers/NetflixSlice";
import { getMe } from "../store/reducers/UsersSlice";
import { AuthContext } from "./Context";

const TopNav = ({ isScrolled }) => {
  const token = localStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.myinfo);
  const { signOut: signOutContext } = useContext(AuthContext);

  const navlinks = [


    { name: "AddMovie", link: "/AddMovie" },
    { name: "My List", link: "/mylist" },


  ];
  const navigate = useNavigate();
  const SignOut = () => {
    signOutContext();

    localStorage.removeItem("token");
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

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (token) {
      dispatch(getMe(token));
    }
  }, [token, dispatch]);

  return (
    <NavContainer>
      <nav className={`${isScrolled ? "scrolled" : "notScrolled"}`}>
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
          <button onClick={handleLogoutClick}>
            <AiOutlineLogout />
          </button>
        </div>
      </nav>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2>User Information</h2>
            {user ? (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button onClick={SignOut}>Logout</button>
                <button onClick={handleCloseModal}>Close</button>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </NavContainer>
  );
};

const NavContainer = styled.div`
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #141414;

    &.scrolled {
      background-color: #000;
    }
  }

  .leftSide {
    display: flex;
    align-items: center;

    .logo {
      img {
        height: 50px;
      }
    }

    .links {
      list-style: none;
      display: flex;
      gap: 1rem;
      margin-left: 2rem;

      li {
        a {
          color: white;
          text-decoration: none;
          font-size: 1rem;
        }
      }
    }
  }

  .middleSide {
    display: flex;
    align-items: center;

    input {
      padding: 0.5rem;
      border-radius: 4px;
      border: none;
      margin-right: 0.5rem;
    }

    button {
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      background-color: #e50914;
      color: #fff;
      cursor: pointer;
      font-size: 1rem;

      &:hover {
        background-color: #f6121d;
      }
    }
  }

  .rightSide {
    button {
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      background-color: #e50914;
      color: #fff;
      cursor: pointer;
      font-size: 1rem;

      &:hover {
        background-color: #f6121d;
      }
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #555;
  }

  button {
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    background-color: #e50914;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #f6121d;
    }
  }
`;

export default TopNav;
