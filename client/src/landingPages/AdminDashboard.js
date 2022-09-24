import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';

const AdminDashboard = () => {

    const {user: {_id, name, email, role}} = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card" >
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group" >
                    <li className="list-group-item" >
                        <Link className="nav-link" to="/create/genre">Create Genre</Link>
                    </li>
                    <li className="list-group-item" >
                        <Link className="nav-link" to="/admin/create/blog">Write Blog</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInfo = () =>{
        return (
            <div className="card mb-5" >
                <h3 className="card-header" >Profile</h3>
                <ul className="list-group" >
                    <li className="list-group-item" >{name}</li>
                    <li className="list-group-item" >{email}</li>
                    <li className="list-group-item" >{role === 1 ? 'Admin' : 'User'}</li>
                </ul>
            </div>
        );
    }

    return (
        <Layout title="Admin Dashboard" description={`Hello, ${name}!`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {adminLinks()}
                </div>
                <div className="col-9">
                    {adminInfo()}
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard;