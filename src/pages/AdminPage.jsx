<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../store/reducers/UsersSlice';
import { useNavigate } from 'react-router-dom';
=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddMovie from './AddMovie';
import MyList from './MyList';
import TopNav from '../components/TopNav';
>>>>>>> 42147da03cc463f2960f11426af4f5ec535bbae9

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
<<<<<<< HEAD
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
=======
        <Router>
            <TopNav />
            <Routes>
                <Route path="/admin/add-movie" element={<AddMovie />} />
                <Route path="/admin/my-list" element={<MyList />} />
            </Routes>
        </Router>
>>>>>>> 42147da03cc463f2960f11426af4f5ec535bbae9
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

