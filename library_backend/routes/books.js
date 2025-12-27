import { Router } from "express";
import store from "../service/store.js";

const router= Router()

//list
router.get('/',(req, res)=>{
    const items= store.list
    res.status(200).json({items})
})

//get by id
router.get('/:id',(req, res)=>{
    const book = store.get(req.params.id);
    if(!book) return res.status(200).json({error:'not found'})
    res.json(book)
})

//create
router.post('/',(req,res)=>{
    const {title, author}= req.body;
    if (!title || typeof title !== 'string'){
        return res.json({error: 'title required'})
    }
    const book=store.create({title:title.trim(), author: author ? String(author).trim : null})
    res.status(201).json({book})
})

//update
router.put('/:id' ,(req, res)=>{
    const { title, author}= req.body;
     if (!title || typeof title !== 'string'){
        return res.json({error: 'title required'})
    }
    const updated= store.update(req.params.id,{title:title.trim(), author: author ? String(author).trim : null})
    res.status(200).json(updated)
})

//delete
router.delete('/:id', (req, res)=>{
    store.delete(req.params.id)
    res.status(204)
})

export default router