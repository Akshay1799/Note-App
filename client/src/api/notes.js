// api/notes.js
import { api } from "./axios";

export const getNotes = async(params={})=>{
    const response = await api.get('/api/notes', {params})
    return response.data;
}

export const createNote = async(noteData)=>{
    const response = await api.post('/api/notes', noteData);
    return response.data;
}

export const deleteNote = async(noteId)=>{
    const response = await api.delete(`/api/notes/${noteId}`);
    return response.data;
}