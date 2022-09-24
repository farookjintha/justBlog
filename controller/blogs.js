const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Blog = require('../models/blogs');
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.blogById = (req, res, next, id) => {
    Blog.findById(id)
        .exec((err, blog) => {
        if(err || !blog){
            return res.status(400).json({
                error: "Blog not found"
            });
        }

        req.blog = blog;
        next();
    })
}

//Reading the blog using the blogId

exports.read = (req, res) => {
    req.blog.photo = undefined;
    return res.json(req.blog);
}

// Post a Blog
exports.postBlog = (req, res) => {
    let form = new formidable.IncomingForm();
    
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        const { title, body, genre } = fields;
        console.log("Fields:", fields)
        if(!title || !body || !genre){
            res.status(400).json({
                error: "All fields are required."
            });
        }

        fields.author = req.profile.name
        fields.user_id = req.profile._id 
        console.log("Fields Now: ", fields)
        let blog = new Blog(fields);

        //File Size
        // 1 kb = 1000
        // 1 mb = 1000000

        if(files.photo){

            // If the photo size is more that 1 mb
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error : "File size exceeded. Image should be less than 1 MB size."
                });
            }

            blog.photo.data = fs.readFileSync(files.photo.path);
            blog.photo.contentType = files.photo.type;
        }

        blog.save((err, result) => {
            if(err){
                console.log(err)
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        });
    });
}

//Removing the blog from the database
exports.remove = (req, res) =>{
    let blog = req.blog;
    blog.remove((err, deletedBlog) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            message: "Blog Deleted Successfully"
        });
    });
}

//To update a blog
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        const { title, body, genre } = fields;

        if(!title || !body || !genre){
            res.status(400).json({
                error: "All fields are required."
            });
        }


        let blog = req.blog;
        blog = _.extend(blog, fields);

        //File Size
        // 1 kb = 1000
        // 1 mb = 1000000


        if(files.photo){

            // If the photo size is more that 1 mb
            if(files.photo.size > 1000000){
                res.status(400).json({
                    error : "File size exceeded. Image should be less than 1 MB size."
                });
            }

            blog.photo.data = fs.readFileSync(files.photo.path);
            blog.photo.contentType = files.photo.type;
        }

        blog.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        });
    });
}


 exports.list = (req, res) => {
    let order =    req.query.order ? req.query.order : "desc";
    let sortBy =    req.query.sortBy ? req.query.sortBy : "createdAt";
    let limit =    req.query.limit ? parseInt(req.query.limit) : 6;

    Blog.find()
        .select("-photo")
        .populate('genre')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, blogs) =>{
            if(err){
                return res.status(400).json({
                    error: "Blog not found"
                });
            }

            res.json(blogs);
        });

 }

 exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "genre") {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Blog.find(findArgs)
        .select("-photo")
        .populate("genre")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
}

 exports.photo = (req, res, next) => {
     console.log("Blog Phto: ", req.blog)
    if(req.blog.photo.data){
        res.set('Content-Type', req.blog.photo.contentType);
        return res.send(req.blog.photo.data);
    }

    next();
}

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? req.query.limit : 6;

    Blog.find({ _id: {$ne: req.blog}, genre: req.blog.genre})
        .limit(limit)
        .populate('genre', '_id name')
        .exec((err, blogs) => {
            if(err){
                return res.status(400).json({
                    error: "Blogs not found"
                });
            }

            res.json(blogs);
        });

 }