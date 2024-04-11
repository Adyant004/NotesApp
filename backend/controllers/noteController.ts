import { Request,Response } from 'express'
import { Notes } from '../Models/Notes';
import { StatusCodes } from 'http-status-codes';

interface customRequest extends Request {
    user?: any
}

export const getAllNotes = async (req: customRequest,res: Response) => {
    try {
        const notes = await Notes.find({ creatorId: req.user._id })
        res.status(StatusCodes.OK).json( notes);
    } catch (error: any) {
        console.log("Error in getAllNotes controller: ", error.message);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}

export const getANote = async (req: customRequest, res: Response) => {
    try {
        const { _id: userId } = req.user;
        const { id: noteId } = req.params;

        const Note = await Notes.findOne({
            _id: noteId, 
            creatorId: userId,
        })

        if(!Note){
            return res.status(StatusCodes.NOT_FOUND).json({ message: `Note not found!` })
        }

        res.status(StatusCodes.OK).json({ Note })
    } catch (error: any) {
        console.log("Error in getANote controller: ", error.message);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}

export const createNote = async(req: customRequest, res: Response) => {
    try {
        req.body.creatorId = req.user._id;

        if(!req.body.content) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Content field is empty!' })
        }

        const Note = await Notes.create(req.body);
        res.status(StatusCodes.CREATED).json({ Note });
    } catch (error: any) {
        console.log("Error in createNote controller: ", error.message);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}

export const updateNote = async(req: customRequest, res: Response) => {
    try {
        const { content } = req.body;
        const { _id: userId } = req.user;
        const { id: noteId } = req.params;

        if(!content) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Content field is empty!' })
        }

        const Note = await Notes.findByIdAndUpdate(
            { _id: noteId, creatorId: userId },
            req.body,
            { new: true, runValidators:true }
        )

        if(!Note) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Note not found' });
        }

        res.status(StatusCodes.OK).json({ Note })

    } catch (error: any) {
        console.log("Error in updateNote controller: ", error.message);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}

export const deleteNote = async(req: customRequest, res: Response) => {
    try {
        const { _id: userId } = req.user;
        const { id: noteId } = req.params;
    
        const Note = await Notes.findByIdAndUpdate({
            _id: noteId,
            creatorId: userId, 
        })
    
        if(!Note) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Note not found' });
        }
    
        res.status(StatusCodes.OK).json({ message: 'Message deleted successfully! '});
    } catch (error: any) {
        console.log("Error in updateNote controller: ", error.message);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
}