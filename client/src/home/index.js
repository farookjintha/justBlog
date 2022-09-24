import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import Card from '../core/Card';
import {getBlogs} from '../core/apiCore';

const Home = () => {

    const [blogsByLiked, setBlogsByLiked] = useState([]);
    const [blogsLatest, setBlogsLatest] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getBlogs('likes').then((err, data) => {
            if(err){
                setError(err);
            }else{
                setBlogsByLiked(data);
            }
        })
    }

    const loadBlogsLatest = () => {
        getBlogs('createdAt').then((err, data) => {
            if(err){
                setError(err);
            }else{
                console.log("Blogs: ", data)
                setBlogsLatest(data);
            }
        })
    }

    useEffect(() => {
        loadBlogsLatest()
        loadProductsBySell()
    }, [])


    return(
        <Layout title="Happy Reading!!!" description = "Latest & Most liked blogs" className="container-fluid">

            <h2 className="mb-4">Latest Blogs</h2>
            <div className="row">
                {blogsLatest && blogsLatest.map((blog, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card blog={blog} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4">Most Liked</h2>
            <div className="row">
                {blogsByLiked && blogsByLiked.map((blog, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card blog={blog} />
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default Home;