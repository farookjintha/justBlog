import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signUp } from '../auth';

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const [isChecked, setIsChecked] = useState(false);
    const [role, setRole] = useState(0);

    const {name, email, password, success, error} = values;

    useEffect(()=> {
        if(isChecked){
            setRole(1);
            console.log("Role 1")
        }else{
            setRole(0);
        }
    }, [isChecked]);
    

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false});
        
        console.log({name, email, password, role})
        signUp({name, email, password, role})
        .then(data => {
            console.log(data)
            if(data.err){
                setValues({...values, error: data.err, success:false})
            }else{
                setValues({...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true})
            }
        })
    }

    const toggleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    const signUpForm = () => (
            <form>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
                </div>
                <div className="form-group">
                    <label>
                        <input
                                    type="checkbox"
                                    value={role}
                                    checked={isChecked}
                                    onChange={toggleCheckboxChange}
                                />

                        {" Sign up as Admin"}
                    </label>
                </div>
                <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
            </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{display:error ? '':'none'}} >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{display:success ? '':'none'}} >
            Account created successfully. Please <Link to="/signin">Sign-In</Link>
        </div>
    );


    return(
        <Layout title="Sign Up" description = "for some amazing blogs" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>

    );
}

export default Signup; 

