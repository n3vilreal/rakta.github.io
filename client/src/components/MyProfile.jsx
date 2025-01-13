import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext/Index';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import MyImage from '../assets/trialProfile.jpg';

export default function MyProfile() {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        bloodDonationCounter: 0,
        healthPercentage: 20
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!currentUser?.uid) {
                setLoading(false);
                return;
            }

            try {
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserData({
                        name: data.name || currentUser.displayName || 'No Name',
                        email: currentUser.email || data.email || 'No Email',
                        phoneNumber: currentUser.phoneNumber || data.phoneNumber || 'No Phone Number',
                        bloodDonationCounter: data.bloodDonationCounter || 0,
                        healthPercentage: data.healthPercentage || 20
                    });
                } else {
                    // If document doesn't exist, create it with default values
                    const defaultData = {
                        name: currentUser.displayName || 'No Name',
                        email: currentUser.email || 'No Email',
                        phoneNumber: currentUser.phoneNumber || 'No Phone Number',
                        bloodDonationCounter: 0,
                        healthPercentage: 20,
                        createdAt: new Date(),
                        uid: currentUser.uid
                    };
                    
                    await setDoc(userDocRef, defaultData);
                    setUserData(defaultData);
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load profile data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [currentUser]);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-red-600">
                {error}
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                Please log in to view your profile
            </div>
        );
    }

    return (
        <div className="main w-full min-h-screen" style={{ fontFamily: "'Saira Condensed', sans-serif" }}>
            <div className='main-profile h-full w-full flex flex-col'>
                <div className='person-info flex w-full mt-20 max-md:flex-col max-md:items-center'>
                    <div className='person flex flex-col w-[40%] items-center space-y-6'>
                        <img src={MyImage} alt="" className='w-56 h-56 rounded-full object-cover shadow-lg'/>
                        <span className='text-2xl font-semibold'>{userData.name}</span>
                    </div>

                    <div className='person-details flex flex-col w-[60%] space-y-10 mt-14 max-md:w-full max-md:items-center max-md:px-4'>
                        <span className='text-7xl font-bold max-md:text-4xl max-md:text-center'>
                            You have donated blood <br />
                            <span className='text-red-600'>{userData.bloodDonationCounter} </span>times.
                        </span>
                        <div className="contact-info flex flex-col space-y-2 text-sm max-md:items-center">
                            <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span>Email: {userData.email}</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span>Phone Number: {userData.phoneNumber}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="health-bar-container w-full mt-10 flex justify-center px-4">
                    <div className='health-bar w-[70vw] bg-white flex justify-start border-4 border-black p-2 rounded-lg'>
                        <div 
                            className='progress-container py-2 border-3 bg-red-600 flex justify-center items-center transition-all duration-300 ease-in-out rounded'
                            style={{ width: `${userData.healthPercentage}%` }}
                        >
                            {userData.healthPercentage >= 20 ? (
                                <span className='text-white text-2xl'>{userData.healthPercentage}%</span>
                            ) : (
                                <span></span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}