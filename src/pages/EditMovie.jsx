import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { editMovie } from '../store/reducers/NetflixSlice';

const EditMovie = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")

    const [movie, setMovie] = useState({
        name: '',
        trailer: '',
        yearReleased: '',
        image: '',
        category: 'ACTION',
        description: ''
    });
    const [loading, setLoading] = useState(true);

    const movies = useSelector((state) => state.netflix.movies);
    const { id } = useParams();

    useEffect(() => {
        const foundMovie = movies.find((movie) => Number(movie.id) === Number(id));
        if (foundMovie) {
            setMovie(foundMovie);
        }
        setLoading(false);
    }, [id, movies]);

    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        dispatch(editMovie(token, {
            ...movie,
            yearReleased: Number(movie.yearReleased),
            movieName: movie.name
        })).then((success) => {
            if (success) {
                alert('Filme atualizado com sucesso!');
                navigate('/');
            }
        })
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <FormContainer>
            <form onSubmit={handleFormSubmit}>
                <h2>Edit Movie</h2>
                <label>
                    Title:
                    <input
                        type="text"
                        value={movie?.name}
                        onChange={(e) => setMovie({ ...movie, name: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Trailer URL:
                    <input
                        type="url"
                        value={movie?.trailer}
                        onChange={(e) => setMovie({ ...movie, trailer: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        value={movie?.description}
                        onChange={(e) => setMovie({ ...movie, description: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Year Released:
                    <input
                        type="number"
                        min="1888"
                        max={new Date().getFullYear()}
                        value={movie?.yearReleased}
                        onChange={(e) => setMovie({ ...movie, yearReleased: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="url"
                        value={movie?.image}
                        onChange={(e) => setMovie({ ...movie, image: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Category:
                    <select
                        value={movie?.category}
                        onChange={(e) => setMovie({ ...movie, category: e.target.value })}
                        required
                    >
                        <option value="ACTION">ACTION</option>
                        <option value="DRAMA">DRAMA</option>
                        <option value="HORROR">HORROR</option>
                        <option value="ROMANCE">ROMANCE</option>
                        <option value="COMEDY">COMEDY</option>
                        <option value="DOCUMENTARY">DOCUMENTARY</option>
                        <option value="SUPERHERO">SUPERHERO</option>
                        <option value="FANTASY">FANTASY</option>
                    </select>
                </label>
                <button type="submit">Update Movie</button>

            </form>
        </FormContainer>
    );
};

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #222;

  form {
    background-color: #333;
    padding: 2rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    width: 300px;
    gap: 1rem;

    h2 {
      color: #fff;
    }

    label {
      display: flex;
      flex-direction: column;
      color: #fff;

      input,
      textarea,
      select {
        margin-top: 0.5rem;
        padding: 0.5rem;
        border-radius: 4px;
        border: none;
      }

      textarea {
        resize: vertical;
      }
    }

    button {
      padding: 0.75rem;
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

    p {
      color: #0f0;
      margin-top: 1rem;
      text-align: center;

      &.error-details {
        color: #f00;
      }
    }
  }
`;

export default EditMovie;
