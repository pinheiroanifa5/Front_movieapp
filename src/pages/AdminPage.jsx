import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../store/reducers/UsersSlice';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const token = useSelector((state) => state.auth.token); // Certifique-se de que o token está sendo armazenado no estado auth

    useEffect(() => {
        if (token) {
            const loadUsers = async () => {
                await dispatch(fetchAllUsers(token));
                setLoading(false);
            };
            loadUsers();
        }
    }, [dispatch, token]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <h1>Registered Users</h1>
            <UserList>
                {users.map((user) => (
                    <UserItem key={user.id}>
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </UserItem>
                ))}
            </UserList>
        </Container>
    );
};

const Container = styled.div`
  padding: 2rem;
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

export default AdminPage;
