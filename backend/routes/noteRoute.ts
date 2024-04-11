import express from "express";
const noteRouter = express.Router();
import { protectRoute } from '../middleware/protectRoute';
import { getAllNotes,getANote,createNote,updateNote,deleteNote } from '../controllers/noteController';

noteRouter.route('/').get(protectRoute,getAllNotes).post(protectRoute,createNote);
noteRouter.route('/:id').get(protectRoute,getANote).patch(protectRoute,updateNote).delete(protectRoute,deleteNote);

export default noteRouter;