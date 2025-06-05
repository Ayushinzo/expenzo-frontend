import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.js';
import Button from '@mui/material/Button';
import axios from 'axios';
import { TbLoader2 } from "react-icons/tb";
import { FiSave } from "react-icons/fi";
import { toast } from 'react-toastify';

function Profile() {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [publicId, setPublicId] = useState(null);
    const [receiveEmails, setReceiveEmails] = useState(false);
    const [verified, setVerified] = useState();
    const [loading, setLoading] = useState(false);

    const auth = getAuth(app);

    const defaultPhotoURL =
        '/user.avif';

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
        } else {
            toast.error('Please select a valid image file.');
        }
    };

    const handleSaveChanges = async () => {
        if (!username || !auth.currentUser) {
            toast.error('Username is required.');
            return;
        }

        try {
            setLoading(true);
            let uploadedURL = imageUrl;
            let newPublicId = publicId;

            // Upload image if selected
            if (image) {
                const formData = new FormData();
                formData.append('file', image);
                formData.append('upload_preset', 'user_profile_uploads');

                const res = await axios.post(
                    'https://api.cloudinary.com/v1_1/dqoczxzcc/image/upload',
                    formData
                );

                uploadedURL = res.data.secure_url;
                newPublicId = res.data.public_id;

                // Optionally delete old image via backend
                let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile/delete-image`, { publicId });
            }

            // Update Firebase user profile
            await updateProfile(auth.currentUser, {
                displayName: username,
                photoURL: uploadedURL,
            });

            toast.success('Profile updated successfully.');
            setLoading(false);
            setImage(null);
            setImageUrl(uploadedURL);
            setPublicId(newPublicId);
        } catch (err) {
            toast.error('Could not save changes.');
            setLoading(false);
        }
    };

    async function handleReceiveEmails(e) {
        setReceiveEmails(e.target.checked);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/mail/changeEmailStatus`, {
                email: auth.currentUser.email,
                receiveEmails: e.target.checked
            });
            if (response.data.success) {
                setReceiveEmails(e.target.checked);
            } else {
                setReceiveEmails(!e.target.checked);
            }
        } catch (error) {
            setReceiveEmails(!e.target.checked);
        }
    }

    async function setEmailStatus() {
        try {
            let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/mail/getEmailStatus`, {
                email: auth.currentUser.email
            })
            if (response.data.success) {
                setReceiveEmails(response.data.mailSend)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setImageUrl(user.photoURL || defaultPhotoURL);
                setUsername(user.displayName || '<No Username>');
                setVerified(user.emailVerified);
                setEmail(user.email);
                setEmailStatus()
                const match = user.photoURL?.match(/\/v\d+\/([^/]+)\.\w+$/);
                if (match) setPublicId(match[1]);
            }
        });
    }, [auth]);

    return (
        <div className='m-2 md:m-5 p-1 lg:p-5 shadow-md min-h-full bg-gradient-to-b from-white to-blue-50 flex items-center justify-center'>
            <div className='shadow-md p-8 rounded-lg bg-white max-w-md w-full'>
                <div className='flex flex-col items-center mb-6'>
                    <label htmlFor='image' className='mb-4'>
                        <img
                            src={image ? URL.createObjectURL(image) : imageUrl || defaultPhotoURL}
                            alt='profile'
                            className='w-32 h-32 rounded-full cursor-pointer border-4 border-blue-100 hover:border-blue-200 transition-all'
                        />
                    </label>
                    <input
                        type='file'
                        accept='image/*'
                        name='image'
                        id='image'
                        hidden
                        onChange={handleFileChange}
                    />
                </div>

                <div className='space-y-4'>
                    <div className='flex flex-col'>
                        <label className='text-sm text-gray-600 mb-1'>Username</label>
                        <input
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            maxLength={17}
                            className='p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200'
                            placeholder='Enter your username'
                        />
                    </div>

                    <div className='flex flex-col cursor-pointer' onClick={() => toast.info('Email cannot be changed')}>
                        <span className='text-sm text-gray-600'>Email</span>
                        <span className='p-2 bg-gray-50 rounded-md'>{email}</span>
                    </div>

                    <div className='flex flex-col'>
                        <span className='text-sm text-gray-600'>Email Status</span>
                        <span className={`p-2 ${verified ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} rounded-md`}>{verified ? 'Verified' : 'Not Verified'}</span>
                    </div>

                    <div className='flex flex-col'>
                        <span className='text-sm text-gray-600'>Last Sign In</span>
                        <span className='p-2 bg-gray-50 rounded-md'>
                            {auth.currentUser?.metadata.lastSignInTime}
                        </span>
                    </div>

                    <div className='flex flex-col'>
                        <span className='text-sm text-gray-600'>Account Created</span>
                        <span className='p-2 bg-gray-50 rounded-md'>
                            {auth.currentUser?.metadata.creationTime}
                        </span>
                    </div>

                    <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        className='mt-4'
                        disabled={loading}
                        startIcon={loading ? <TbLoader2 className='animate-spin' /> : null}
                        endIcon={!loading ? <FiSave /> : null}
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </Button>
                    <div className='flex items-center justify-between mt-4 p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                        <span className='text-sm text-gray-600'>Receive Monthly Emails</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" onChange={handleReceiveEmails} checked={receiveEmails} />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer 
                                peer-checked:after:translate-x-full peer-checked:after:border-white 
                                after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
                                after:bg-white after:border-gray-300 after:border after:rounded-full 
                                after:h-6 after:w-6 after:shadow-sm after:transition-all duration-300 
                                peer-checked:bg-blue-600 hover:bg-gray-300 peer-checked:hover:bg-blue-700">
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
