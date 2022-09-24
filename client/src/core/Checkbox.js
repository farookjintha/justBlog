import React, {useState, useEffect} from 'react';

const Checkbox = ({genres, handleFilters}) =>{

    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {

        //return the index of -1
        const currentGenreId = checked.indexOf(c);
        const newCheckedGenreId = [...checked]

        //if currently checked wasnt already in checked state > push
        //else pull/take off
        if(currentGenreId === -1){
            newCheckedGenreId.push(c);
        }else{
            newCheckedGenreId.splice(currentGenreId, 1);
        }

        console.log(newCheckedGenreId);
        setChecked(newCheckedGenreId);
        handleFilters(newCheckedGenreId);
    }

    return genres.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input" />
            <label className="form-check-label">{c.name}</label>
        </li>
    ));
}

export default Checkbox;