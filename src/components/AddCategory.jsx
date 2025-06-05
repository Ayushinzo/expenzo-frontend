import React, { useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import EmojiPicker from 'emoji-picker-react';
import { TbLoader2 } from "react-icons/tb";
import { getAuth } from 'firebase/auth'
import app from '../firebase/firebase.js'
import axios from 'axios'

function AddCategory({ setDisplayCategory, fetchCategories }) {
    let auth = getAuth(app)
    let user = auth.currentUser
    const [emoji, setEmoji] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState({
        authorEmail: user.email || undefined,
        name: "",
        type: "expense",
        note: ""
    })
    const handleEmojiClick = (emojiData) => {
        setEmoji(emojiData.emoji);
        setShowPicker(false);
    };
    function handleCategoryChange(e) {
        let name = e.target.name
        let value = e.target.value
        setData({
            ...data,
            [name]: value,
        })
    }
    async function handleCategorySubmit(e) {
        e.preventDefault()
        try {
            setLoader(true)
            let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/category/add`, {
                authorEmail: data.authorEmail,
                emoji,
                name: data.name,
                type: data.type,
                note: data.note
            })
            if (response.data.success) {
                setDisplayCategory(false)
                setLoader(false)
                fetchCategories(user.email)
            }
            else {
                console.log(response.data)
                setLoader(false)
            }
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }
    return (
        <div className='fixed flex items-center justify-center z-50 top-0 right-0 left-0 bottom-0 p-3 bg-gray-700/50'>
            <div className='p-6 rounded-2xl shadow-lg w-[500px] bg-white'>
                <div className='flex justify-between items-center mb-6'>
                    <div className='text-gray-800 text-2xl font-bold'>Add New Category</div>
                </div>
                <form className='space-y-6' onSubmit={handleCategorySubmit}>
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">Choose an Emoji</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                readOnly
                                value={emoji}
                                name='emoji'
                                required
                                placeholder="pick emoji"
                                onChange={handleCategoryChange}
                                onClick={() => setShowPicker(!showPicker)}
                                className="border border-gray-300 px-4 py-2.5 rounded-lg cursor-pointer w-32 text-center text-xl hover:border-gray-400 transition-colors"
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
                            onChange={handleCategoryChange}
                            maxLength={20}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">Note</label>
                        <textarea name="note" className='w-full h-[130px] resize-none px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors' placeholder='Note (Optional)' maxLength={140} onChange={handleCategoryChange}></textarea>
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
                            defaultValue="expense"
                            name="type"
                            onChange={handleCategoryChange}
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
                            onClick={() => setDisplayCategory(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer flex gap-2 items-center"
                        >
                            {
                                loader && <TbLoader2 className='animate-spin' />
                            }
                            Add Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCategory
