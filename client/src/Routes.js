import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './landingPages/Signup';
import Signin from './landingPages/Signin';
import Home from './home';
import PrivateRoute from './auth/PrivateRoute';
import UserDashboard from './landingPages/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './landingPages/AdminDashboard';
import AddGenre from './admin/AddGenre';
import AddBlog from './blog/AddBlog';
import SearchByGenre from './core/SearchByGenre';
import ViewBlog from './blog/ViewBlog';


const Routes = () =>{
    return (
        <BrowserRouter>
            
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/search" exact component={SearchByGenre} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/blog/:blogId" exact component={ViewBlog} />
                
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/genre" exact component={AddGenre} />
                <AdminRoute path="/admin/create/blog" exact component={AddBlog} />
                <PrivateRoute path="/user/create/blog" exact component={AddBlog} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;