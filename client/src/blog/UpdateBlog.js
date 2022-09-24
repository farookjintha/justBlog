import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import {createBlog, getGenres} from '../apiBlog';

const AddBlog = () => {

    const [values, setValues] = useState({
        title: '',
        body: '',
        genres: [],
        genre: null,
        user_id: null,
        author: '',
        like_user_id: null,
        likes: null,
        photo: '',
        loading: false,
        error: '',
        createdBlog: '',
        redirectToProfile: false,
        formData: ''
    });

    const {user, token} = isAuthenticated();
    const {
        title,
        body,
        genres,
        genre,
        user_id,
        author,
        like_user_id,
        likes,
        loading,
        error,
        createdBlog,
        redirectToProfile,
        formData
    } = values;

    const init = () => {
        getGenres().then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            }else{
                setValues({...values, genres: data, formData: new FormData()});
            }
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value})
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values,  error: "", loading: true });

        createBlog(user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values,
                    title: '',
                    body: '',
                    photo: '',
                    genres:[],
                    loading: false,
                    createdBlog: data.title
                })
            }
        })
    };

    const newProductForm = () => (
        <form className='mb-3' onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className='form-group'>
                <label className='btn btn-outline-secondary'>
                    <input onChange={handleChange('photo')} type='file' name='photo' accept='image/*' />
                </label>
            </div>

            <div className='form-group'>
                <label className='text-muted'>Title</label>
                <input onChange={handleChange('title')} type='text' className='form-control' value={title} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Content</label>
                <textarea onChange={handleChange('body')} className='form-control' value={body} />
            </div>

            <div className='form-group'>
                <label className='text-muted'>Genre</label>
                <select onChange={handleChange('genre')} className='form-control'>
                    <option>Select a genre</option>

                    {genres && genres.map((g, i) => (<option key={i} value={g._id}>{g.name}</option>))}

                </select>
            </div>

            <button className="btn btn-outline-primary">Post Blog</button>            
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display: error? '' : 'none'}}>
            <h2>{error}</h2>
        </div>
    )

    const showLoading = () => (
        loading && (<div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        )
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdBlog? '' : 'none'}}>
            <h2>{`${createdBlog} is created`}</h2>
        </div>
    )

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Back to dashboard</Link>
        </div>
    );


    return (
        <Layout title="Write a new blog " description={`Hello, ${user.name}! Do you wanna blog?`} >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newProductForm()}
                    {goBack()}
                </div>
            </div>
            
        </Layout>
    );
}

export default AddBlog;