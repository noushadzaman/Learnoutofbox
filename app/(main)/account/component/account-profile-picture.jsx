'use client';

import { updateUserInfo } from "@/app/actions/account";
import Image from "next/image";
import { useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
const imgBBUploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const AccountProfilePicture = ({ loggedInUser }) => {
    const [profilePicture, setProfilePicture] = useState(loggedInUser?.profilePicture);
    const defaultImg = `${loggedInUser?.firstName[0]}${loggedInUser?.lastName[0]}`;

    const loadFile = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await fetch(imgBBUploadUrl, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                setProfilePicture(result.data.url);
                await updateUserInfo(loggedInUser?.email, { profilePicture: result.data.url })
            } else {
                console.error('Image upload failed:', result);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="relative size-28 mx-auto">
            <input
                id="pro-img"
                name="profile-image"
                type="file"
                className="hidden"
                onChange={loadFile}
            />
            {profilePicture ?
                <Image
                    src={profilePicture}
                    className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                    id="profile-banner"
                    alt={`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}
                    width={112}
                    height={112}
                />
                : <div className="bg-[#98b1d9] w-full h-full rounded-full flex items-center justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    <p
                        className="text-[#f78d89] font-bold text-7xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                    >{defaultImg}</p>
                </div>
            }
            <label
                className="absolute inset-0 cursor-pointer"
                htmlFor="pro-img"
            />
        </div>
    );
};

export default AccountProfilePicture;