import React, { useState } from 'react';
import {Link, Redirect } from 'react-router-dom';
import moment from 'moment';

import ShowImage from './ShowImage';


const Card = ({blog, 
                showReadBlogButton = true, 
                showSaveButton = true, 
                showRemoveFromSaveButton = false,
                setRun = f => f,
                run = undefined}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(blog.count);

    const showViewButton = () => {
        return(
            showReadBlogButton && (
                <Link to={`/blog/${blog._id}`}>
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                        Read Blog
                    </button>
                </Link>
            )
        )
    }


    const shouldRedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (showSaveButton) => {
        return showSaveButton && (
            <button className="btn btn-outline-warning mt-2 mb-2">
                    Save Blog
            </button>
        )
    }




    return (
        
            <div className="card">
                <div className="card-header name">{blog.title}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={blog} url="blog" />
                    <p className = "lead mt-2">{blog.body.substring(0, 100)}</p>
                    <p className="black-8">Added {moment(blog.createdAt).fromNow()}</p>
                    
                        {showViewButton(showReadBlogButton)}

                        {showAddToCart(showSaveButton)}

                </div>
            </div>
        
    )
}

export default Card;