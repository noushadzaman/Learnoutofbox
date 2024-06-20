"use client";

import { changePassword } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const ChangePassword = ({ email }) => {
    const [passwordState, setPasswordState] = useState({
        oldPassword: "",
        newPassword: "",
        newPasswordCheck: ""
    });

    function handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;
        setPasswordState({ ...passwordState, [key]: value })
    }

    async function doPasswordChange(event) {
        event.preventDefault();
        if (passwordState.newPassword !== passwordState.newPasswordCheck) {
            toast.error(`Password didn't match`);
            return;
        }
        try {
            await changePassword(email, passwordState?.oldPassword, passwordState?.newPassword)
            toast.success(`Password changed successfully.`)
        }
        catch (error) {
            toast.error(`Error: ${error.message}`)
        }
    }

    return (
        <div>
            <h5 className="text-lg font-semibold mb-4">
                Change password :
            </h5>
            <form onSubmit={doPasswordChange}>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <Label className="mb-2 block">Old password :</Label>
                        <Input
                            type="password"
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Old password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">New password :</Label>
                        <Input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder="New password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">
                            Re-type New password :
                        </Label>
                        <Input
                            type="password"
                            name="newPasswordCheck"
                            id="newPasswordCheck"
                            placeholder="Re-type New password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <Button className="mt-5" type="submit">
                    Save password
                </Button>
            </form >
        </div >
    );
};

export default ChangePassword;