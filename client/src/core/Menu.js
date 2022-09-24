import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import {signOut, isAuthenticated} from '../auth'

const isActive = (history, path) => {
    if(history.location.pathname === path){
        return {color: '#ff9900', float: "right"}
    }else{
        return {color: '#ffffff', float: "right"}
    }
}


const Menu = ({history}) => {
    return (
        <nav>
            <div className="nav nav-tabs bg-primary">
                
                <li className="nav-item">
                    <a class="navbar-brand" href="/" style={{cursor: 'pointer',color: 'black'}}>Blogs</a>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/" >Home</Link>
                </li>

                <li className="nav-item ">
                    <Link className="nav-link" style={isActive(history, '/search')} to="/search" >Search</Link>
                </li>

                {/* {!isAuthenticated() && (<li className="nav-item mr-auto">
                    <Link className="nav-link" style={isActive(history, '/cart')} to="/cart" >
                        Cart <sup><small className="cart-badge">{itemTotal()}</small></sup>
                    </Link>
                </li>)} */}

                {/* {isAuthenticated() && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/cart')} to="/cart" >
                            Cart <sup><small className="cart-badge">{itemTotal()}</small></sup>
                        </Link>
                    </li>
                )} */}

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item" style={{float:'right'}}>
                        <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard" >Dashboard</Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item mr-auto">
                        <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard" >Dashboard</Link>
                    </li>
                )}

                {!isAuthenticated() && (
                            <li className="nav-item ml-auto">
                                <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Sign In</Link>
                            </li>   
                )}
                {!isAuthenticated() && (
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Sign Up</Link>
                            </li>
                )}

                {isAuthenticated() && (
                    <li className="nav-item">
                    <span className="nav-link" 
                        style={{cursor: 'pointer',color: '#ffffff'}} 
                        onClick={() => signOut(()=>{
                            history.push('/');
                        })} >

                        Sign Out

                    </span>
                </li>
                )}

            </div>
        </nav>
    );
}

export default withRouter(Menu);