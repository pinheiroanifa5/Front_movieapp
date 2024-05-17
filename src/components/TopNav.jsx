import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";



const TopNav = ({ isScrolled }) => {
    const navlinks = [
        { name: "Home", link: "/" },
        { name: "Tv Show", link: "/tv" },
        { name: "My List", link: "/mylist" },
        { name: "Movies", link: "/movies" },
    ];


    const navigate = useNavigate()
    const SignOut = () => {
        console.log("Até a proxima!");
        navigate('/login');
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
                        {navlinks.map(({ name, link }) => {
                            return (
                                <li key={name}>
                                    <Link to={link}>{name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="rightSide">
                    <button onClick={() => SignOut()}>
                        <AiOutlineLogout />
                    </button>
                </div>
            </nav>
        </NavContainer>
    );
};

const NavContainer = styled.div`
  .notScroll{
    display: flex;
  }
  .scrolled{
    display: flex;
    background-color: black;
  }
  nav{
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
   .leftSide{
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-left: 5rem;

   .logo{
    display: flex;
    justify-content: center;
    align-items: center;
   }
   img{
    width: 10rem;
    height: 2rem;
   }
  }
  .links{
    display: flex;
    list-style-type: none;
    gap: 3rem;
    li{
        a{
            color: white;
            text-decoration: none;
        }
    }
  }
}

.rightSide{
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-right: 1rem;
    button{
        background-color: red;
        border: none;
        cursor: pointer;
        border-radius: 50%;
    }&:focus{
        outline: none;
    }svg{
        color: white;
        font-size: 2rem;
    }
}
`;

export default TopNav;
