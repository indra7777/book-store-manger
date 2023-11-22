import express from 'express';
import {Book} from "../models/bookModel.js";
//import {UserBook} from "../models/bookUserModel.js"

const router = express.Router();

 //update a book by id 
router.put('/:id',async (req,res) =>{

    try{
        if(
            !req.body.title || 
            !req.body.author || 
            !req.body.publishYear
        ){
            return res.status(400).send(
                {
                    message:"send all requires fields: title, author,publish year"
                }
            );
        }
        const updatedBook= await Book.findByIdAndUpdate(req.params.id, req.body ,{new : true});
        //const updateBook= await UserBook.findByIdAndUpdate(req.params.id, req.body ,{new : true});
        // console.log(updatedBook);
        if(updatedBook === null){
            return res.status(404).send({message:"book not found"});
        }
        return res.status(200).json({data:updatedBook});

    }catch(err){
        console.log(err.message);
        return res.status(500).send({message:err.message});
    }
    
    }
    );
    //delete a book by id 
router.delete('/:id', async (req,res) =>{
    try{
        if(!req.params.id){
            return res.status(400).send(
                {
                    message:"send book id in url"
                }
            );
        }
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        //const deleteBook = await UserBook.findByIdAndDelete(req.params.id);
        console.log(deletedBook);
        if(deletedBook === null){
            return res.status(404).send({message:"book not found"});
        }
        return res.status(200).json({data:deletedBook});
    
    }catch(err){
        console.log(err.message);
        return res.status(500).send({message:err.message});
    }
    } );



 //get book from database by id
 router.get('/:id', async (req,res)=>{
    try{
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        console.log(book);
        return res.status(200).json({data:book});
    } catch(err){
        console.log(err.message);
        return res.status(500).send({message:err.message});
    }
 });


 //get all books
 router.get('/', async (req,res)=>{
    try{

        const books = await Book.find({});
        // console.log(books);
        return res.status(200).json({count:books.length,data:books});
    } catch(err){
        console.log(err.message);
        return res.status(500).send({message:err.message});
    }
 });

 //add a new book
 router.post('/', async (req,res)=>{
    try{
        if(
            !req.body.title || 
            !req.body.author || 
            !req.body.publishYear
        ){
            return res.status(400).send(
                {
                    message:"send all requires fields: title, author,publish year"
                }
            );
        }

        const newBook = {
            title : req.body.title ,
            author : req.body.author ,
            publishYear : req.body.publishYear
        };
        const newUserBook ={
            title : req.body.title ,
            author : req.body.author ,
            publishYear : req.body.publishYear,
            userName : req.body.userName,
            genre : req.body.genre
        }
        console.log("creating new book");
        const book = await Book.create(newBook);
       // const userBook = await UserBook.create(newUserBook);
         console.log(book);
        return res.status(201).send({message:"new book created",data:book});
    } catch(err){
        //if any error occurs  
        //log error
        console.log(err.message);
        return res.status(500).send({message:err.message});
    }
 });

export default router;