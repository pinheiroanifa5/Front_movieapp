import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMovie } from '../store/reducers/NetflixSlice';



const AddMovie = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [yearReleased, setYearReleased] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('ACTION');
  const [message, setMessage] = useState('');
  const [errorDetails, setErrorDetails] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      movieName: title,
      description,
      trailer: trailerUrl,
      directorName,
      yearReleased: Number(yearReleased),
      image,
      category
    }
    dispatch(addMovie(token, data, setMessage, setErrorDetails)).then((Success) => {
      if (Success) {
        setMessage('Movie added successfully!');
        setTitle('');
        setDescription('');
        setTrailerUrl('');
        setDirectorName('');
        setYearReleased('');
        setImage('');
        setCategory('ACTION');
        setErrorDetails('');
        // voltar
        navigate('/');
      }
    })

  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <h2>Add a New Movie</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Trailer URL:
          <input
            type="url"
            value={trailerUrl}
            onChange={(e) => setTrailerUrl(e.target.value)}
            required
          />
        </label>
        <label>
          Director Name:
          <input
            type="text"
            value={directorName}
            onChange={(e) => setDirectorName(e.target.value)}
            required
          />
        </label>
        <label>
          Year Released:
          <input
            type="number"
            min="1888"
            max={new Date().getFullYear()}
            value={yearReleased}
            onChange={(e) => setYearReleased(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </label>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="ACTION">ACTION</option>
            <option value="DRAMA">DRAMA</option>
            <option value="HORROR">HORROR</option>
            <option value="ROMANCE">ROMANCE</option>
            <option value="COMEDY">COMEDY</option>
            <option value="ROMANCE">ROMANCE</option>
            <option value="DOCUMENTARY">DOCUMENTARY</option>
            <option value="SUPERHERO">SUPERHERO</option>
            <option value="FANTASY">FANTASY</option>
          </select>
        </label>
        <button type="submit">Add Movie</button>
        {message && <p>{message}</p>}
        {errorDetails && <p className="error-details">{errorDetails}</p>}
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

export default AddMovie;
