import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { resetMyList } from '../store/reducers/NetflixSlice'

const Header = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <HeaderContainer>
      <div className='logo'>
        <img src="/N-sFlix-09-05-2024 (1).png" alt="no internet connection" />

      </div>
      <button onClick={() => {
        navigate(props.login ? '/login' : '/signup')
        if (!props.login) dispatch(resetMyList())
      }}>
        {props.login ? 'Log In ' : 'SignOut'}
      </button>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    .logo{
     img{
      height: 3rem;
      cursor: pointer;
     }
    }
    button{
      padding: 0.5rem 1rem;
      background-color: red;
      border: none;
      cursor: pointer;
      color: white;
      border-radius: 0.2rem;
      font-weight: bolder;
      font-size: 1.05rem;
    }
`

export default Header