import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import Card from '../core/Card';
import { read, listRelated , getGenre} from '../core/apiCore';
import ShowImage from '../core/ShowImage';


const ViewBlog = (props) => {
    const [blog, setBlog] = useState({});
    const [relatedBlog, setRelatedBlog] = useState([]);
    const [error, setError] = useState(false);
    const [genreName, setGenreName] = useState('');

    

    const loadSingleBlog = (blogId) => {
        read(blogId).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setBlog(data)
                console.log("BLOG Data: ", data);
                getGenreName(data.genre);
                //fetch related blog
                listRelated(data._id).then(data => {
                    if(data.error){
                        setError(data.error);
                    }else{
                        setRelatedBlog(data);
                    }
                })
            }
        })
    }

    const getGenreName = (genreId) => {
        getGenre(genreId).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                console.log("Genre Data: ", data);
                setGenreName(data.name)
            }
        })
    }

    useEffect(() => {
        const blogId = props.match.params.blogId;
        console.log("BLOG: ", blogId)
        loadSingleBlog(blogId);
        
    }, [props]);

    return(
        <Layout title={blog && blog.title} description = {`Genre: ${genreName}`} className="container-fluid">
            <div className="row">
                <div className="col-8">
                    <ShowImage item={blog} url="blog" />
                    {blog && blog.body}
                </div>
                <div className="col-4">
                    <h4>Related Blogs</h4>
                    {relatedBlog.map((blog, i) => (
                        <div className="mb-3">
                            <Card  key={i} blog={blog} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ViewBlog