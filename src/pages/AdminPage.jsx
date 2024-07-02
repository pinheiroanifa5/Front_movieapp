import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddMovie from './AddMovie';
import MyList from './MyList';
import TopNav from '../components/TopNav';


const AdminPage = () => {
    return (
        <TopNav />
    );
};

export default AdminPage;
