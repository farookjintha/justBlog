const Genre = require('../models/genre');
const { errorHandler }  = require('../helpers/dbErrorHandler');

exports.genreById =(req, res, next, id) => {
    Genre.findById(id).exec((err, genre) =>{
        if(err || !genre){
            res.status(400).json({
                error: "Genre does not exist"
            });
        }
        req.genre = genre;

        next();
    });
}

exports.create = (req, res) => {
    const genre = new Genre(req.body);

    genre.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({data});
    });
}

exports.read = (req, res) =>{
    return res.json(req.genre);
}

exports.update =(req, res) => {
    const genre = req.genre;
    genre.name = req.body.name;
    genre.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
}

exports.remove =(req, res) => {
    const genre = req.genre;
    genre.remove((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            message: "Genre Deleted Successfully."
        });
    });
}

exports.list =(req, res) => {
    Genre.find().exec((err, genres) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(genres);
    });
}