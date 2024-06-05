import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Player from './pages/Player';
import AddMovie from './pages/AddMovie';
import Netflix from './pages/Netflix';
import MoviePage from './pages/MoviePage';
import Header from './components/Header';
import { useEffect, useMemo, useReducer } from 'react';
import { AuthContext } from './components/Context';

function App() {

  const initialState = {
    userToken: null,
    loading: true
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          loading: false
        }
      case "signIn":
        return {
          ...prevState,
          userToken: action.token,
          loading: false
        }
      case "signOut":
        return {
          ...prevState,
          userToken: null,
          loading: false
        }
      default:
        return prevState
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialState)


  const authContext = useMemo(() => ({
    signIn: (token) => {
      dispatch({ type: "signIn", token })
      localStorage.setItem("token", token)
    },
    signUp: (token) => { },
    signOut: () => {
      dispatch({ type: "signOut" })
      localStorage.removeItem("token")
    }
  }), [])

  useEffect(() => {
    let localStorageToken = null

    localStorageToken = localStorage.getItem("token")

    dispatch({ type: "RETRIVE_TOKEN", token: localStorageToken })

  }, [dispatch])


  if (loginState.loading) {
    return (<div>loading...</div>)
  }

  return (
    <AuthContext.Provider value={authContext}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Netflix />} />
          <Route exact path='/player' element={<Player />} />
          <Route exact path='/AddMovie' element={<AddMovie />} />
          <Route exact path='/movie' element={<MoviePage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/signup' element={<SignUpPage />} />

        </Routes>
        <Header />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
