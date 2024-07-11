import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, fetchAllUsers } from '../store/reducers/UsersSlice';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const token = localStorage.getItem("token"); // Certifique-se de que o token está sendo armazenado no estado auth

    useEffect(() => {
        if (token) {
            const loadUsers = async () => {
                await dispatch(fetchAllUsers(token)).then(() =>
                    setLoading(false)
                );
            };
            loadUsers();
        }
    }, [dispatch, token]);

    const handleDeleteUser = (user) => {
        dispatch(deleteUser(token, user));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <TopBar>
                <Link to="/" className="back-link">
                    <AiOutlineArrowLeft /> Voltar
                </Link>
            </TopBar>
            <h1>Registered Users</h1>
            <UserList>
                {users.map((user) => (
                    <UserItem key={user.id}>
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <Button onClick={() => handleDeleteUser(user)}>Remover</Button>
                    </UserItem>
                ))}
            </UserList>
        </Container>
    );
};

const Container = styled.div`
  padding: 2rem;
  background-color: #222;
  min-height: 100vh;
  color: #fff;
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

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserItem = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
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

export default AdminPage;
