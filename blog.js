//Models are how we interact with the documents in the DB

const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Schema is 

const blogSchema = new Schema({ //Schema is the skeleton that dictates how the document works, just like a class is a blueprint to the object
    title: {
        type: String,
        //required: true          the line "required:true" was removed because it was causing an error i could not understand, yes i know that is a terrible way of solving problems
    },
    snippet: {
        type: String,
        //required: true
    },
    body: {
        type: String,
        //required: true
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema) //First argument makes it automatically search for the 'Blog' collection
                                                //Second argument is the documents Schema

module.exports = Blog;