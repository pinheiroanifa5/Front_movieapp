import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getAllMyListMovies, removeFromMyList } from '../store/reducers/NetflixSlice';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const MyList = () => {
  const dispatch = useDispatch();
  const myList = useSelector((state) => state.netflix.myList);
  const token = localStorage.getItem("token")

  const handleRemoveFromList = (movieId) => {
    dispatch(removeFromMyList(movieId, token)).then((sucess) => {
      if (sucess) alert("Movie was removed!");
    });
  };

  useEffect(() => {
    dispatch(getAllMyListMovies(token))
  }, [token])
  return (
    <MyListContainer>
      <TopBar>
        <Link to="/" className="back-link">
          <AiOutlineArrowLeft /> Voltar
        </Link>
      </TopBar>
      <MyListContent>
        <h2>Minha Lista</h2>
        <MoviesGrid>
          {myList.length > 0 ? (
            myList.map((movie) => (
              <MovieCard key={movie.id}>
                <img src={movie.image} alt={movie.title} />
                <MovieInfo>
                  <h3>{movie.title}</h3>
                  <p>{movie.description}</p>
                  <Button onClick={() => handleRemoveFromList(movie.id)}>Remover</Button>
                </MovieInfo>
              </MovieCard>
            ))
          ) : (
            <p>Nenhum filme adicionado à sua lista ainda.</p>
          )}
        </MoviesGrid>
      </MyListContent>
    </MyListContainer>
  );
};

const MyListContainer = styled.div`
  padding: 2rem;
  background-color: #222;
  min-height: 100vh;
  color: #fff;
  text-align: center;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  background-color: #141414;
  padding: 1rem;
  color: white;

  .back-link {
    display: flex;
    align-items: center;
    color: red;
    text-decoration: none;

    svg {
      margin-right: 0.5rem;
    }
  }
`;

const MyListContent = styled.div`
  margin-top: 0rem;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const MovieCard = styled.div`
  background-color: #333;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }
`;

const MovieInfo = styled.div`
  h3 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    color: #ccc;
    margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  background-color: #e50914;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #f6121d;
  }
`;

export default MyList;
