import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import EmojiPicker from 'emoji-picker-react';
import { TbLoader2 } from "react-icons/tb";
import { toast } from 'react-toastify';
import axios from 'axios'
// import { getAuth } from 'firebase/auth';
// import app from '../firebase/firebase';

function EditCategory({ category, setEdit }) {
    const [name, setName] = useState('')
    const [emoji, setEmoji] = useState('');
    const [note, setNote] = useState('');
    const [type, setType] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [editLoading, setEditLoading] = useState(false);

    const handleEmojiClick = (event, emojiObject) => {
        setEmoji(emojiObject.emoji);
        setShowPicker(false);
    };

    async function updateCategory(e) {
        e.preventDefault();
        try {
            setEditLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/category/edit`, {
                id: category._id,
                name,
                emoji,
                note,
                type
            });

            if (response.data.success) {
                toast.success("Category updated successfully");
                setEditLoading(false);
                setEdit(false);
            } else {
                toast.error(response.data.message || "Failed to update category");
                setEditLoading(false);
            }
        } catch (error) {
            toast.error("An error occurred while updating the category");
            console.error("Error updating category:", error);
            setEditLoading(false);
            return;
        } finally {
            setEditLoading(false);
            return;
        }
    }

    useEffect(() => {
        if (category) {
            setName(category.name);
            setEmoji(category.emoji);
            setNote(category.note);
            setType(category.type);
        }
    }, [category, category.name, category.emoji, category.note, category.type]);

    return (
        <div className='fixed flex items-center justify-center z-50 top-0 right-0 left-0 bottom-0 p-3 bg-gray-700/50'>
            <div className='p-6 rounded-2xl shadow-lg w-[500px] bg-white'>
                <div className='flex justify-between items-center mb-6'>
                    <div className='text-gray-800 text-2xl font-bold'>Update Category</div>
                </div>
                <form className='space-y-6' onSubmit={updateCategory}>
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">Choose an Emoji</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                readOnly
                                name='emoji'
                                required
                                defaultValue={emoji}
                                placeholder="pick emoji"
                                className="border border-gray-300 px-4 py-2.5 rounded-lg cursor-pointer w-32 text-center text-xl hover:border-gray-400 transition-colors"
                                onClick={() => setShowPicker(!showPicker)}
                            />
                            {showPicker && (
                                <div className="absolute z-10 mt-2">
                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">Category Name</label>
                        <input
                            type="text"
                            placeholder='Enter category name'
                            name='name'
                            maxLength={20}
                            required
                            defaultValue={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">Note</label>
                        <textarea name="note" className='w-full h-[130px] resize-none px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors' placeholder='Note (Optional)' maxLength={140}
                            defaultValue={note} onChange={(e) => setNote(e.target.value)}></textarea>
                    </div>
                    <FormControl sx={{ width: '100%' }}>
                        <FormLabel
                            id="category-type-label"
                            sx={{
                                color: 'rgb(55 65 81)',
                                fontWeight: 600,
                                fontSize: '0.875rem'
                            }}
                        >
                            Category Type
                        </FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="category-type-label"
                            name="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <FormControlLabel
                                value="expense"
                                control={<Radio />}
                                label="Expense"
                            />
                            <FormControlLabel
                                value="income"
                                control={<Radio />}
                                label="Income"
                            />
                        </RadioGroup>
                    </FormControl>
                    <div className="flex justify-end space-x-3 mt-1">
                        <button
                            type="button"
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                            onClick={() => setEdit(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex gap-2 items-center"
                            disabled={editLoading}
                        >
                            {editLoading && <TbLoader2 className='animate-spin' />}
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default memo(EditCategory)
