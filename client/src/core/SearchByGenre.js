import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import { getGenres, getFilteredBlogs } from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: {genre: []}
    });
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [size, setSize] = useState(0);

    const init = () => {
        getGenres().then(data => {
            if(data.error){
                setError(data.error);
            }else{
                setGenres(data);
            }
        }).catch(err => console.log(err));
    }

    const loadFilteredResults = (newFilters) => {
        getFilteredBlogs(skip, limit, newFilters).then(data =>{
            if(data.error){
                setError(data.error);
            }else{
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        })
    }

    const loadMore = () => {
        let toSkip = skip + limit;

        getFilteredBlogs(toSkip, limit, myFilters.filters).then(data =>{
            if(data.error){
                setError(data.error);
            }else{
                setFilteredResults([...filteredResults, ...data.data]);
                // setSize(data.size);
                setSkip(toSkip);
            }
        })
    }

    const loadMoreButton = () => {
        return(
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load more</button>
            )
        )
    }

    useEffect (() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filter);
    }, []);

    const handleFilters = (filters, filterBy) =>{
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters;

        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    return(
        <Layout title="You are at the right place!" description = "Search & find blogs of your choice" className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <h4>Filter by Genre</h4>
                    <ul>
                        <Checkbox genres={genres} handleFilters = {filters => handleFilters(filters, "genre")} />
                    </ul>
                </div>
                <div className="col-8">
                    <h2 className="mb-4">Blogs</h2>
                    <div className="row">
                        {filteredResults.map((blog, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card key={i} blog={blog} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
};

export default Shop;