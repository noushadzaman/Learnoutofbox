"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function SignupForm({ role }) {
    const router = useRouter();

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const firstName = formData.get("first-name");
            const lastName = formData.get("last-name");
            const email = formData.get('email');
            const password = formData.get('password');

            const userRole = ((role === "student") || (role === "instructor")) ? role : "student";

            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    userRole
                })
            });
            response.status === 201 && router.push("/login");

        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" name="first-name" placeholder="Max" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" name="last-name" placeholder="Robinson" required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" name="confirmPassword" type="password" />
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                    </div>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}





// 'use client';

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { useForm } from "react-hook-form";

// export function SignupForm({ role }) {
//     const router = useRouter();
//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm()

//     const onSubmit = async (data) => {
//         const {
//             firstName,
//             lastName,
//             email,
//             password,
//             confirmPassword
//         } = data;
//         const user = {
//             firstName,
//             lastName,
//             email,
//             password,
//             role: role
//         };

//         try {
//             if (password !== confirmPassword) {
//                 toast.error("Password didn't matched");
//                 return;
//             }
//             const res = await fetch('/api/auth/register', {
//                 method: "POST",
//                 headers: {
//                     "Content-type": "application/json"
//                 },
//                 body: JSON.stringify(user)
//             })
//             res.status === 201 && router.push("/login");
//         }
//         catch (error) {
//             setError(error.message);
//             console.log(error)
//         }
//     };

//     return (
//         <Card className="mx-auto max-w-sm">
//             <CardHeader>
//                 <CardTitle className="text-xl">Sign Up</CardTitle>
//                 <CardDescription>
//                     Enter your information to create an account
//                 </CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="grid gap-4">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="grid gap-2">
//                                 <Label htmlFor="first-name">First name</Label>
//                                 <Input
//                                     id="firstName"
//                                     name="firstName"
//                                     {...register("firstName", { required: "first Name is required" })}
//                                     placeholder="Max"
//                                     required />
//                             </div>
//                             <div className="grid gap-2">
//                                 <Label htmlFor="lastName">Last name</Label>
//                                 <Input
//                                     id="lastName"
//                                     name="lastName"
//                                     {...register("lastName", { required: "Last Name is required" })}
//                                     placeholder="Robinson"
//                                     required
//                                 />
//                             </div>
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="email">Email</Label>
//                             <Input
//                                 id="email"
//                                 name="email"
//                                 {...register("email", { required: "Email is required" })}
//                                 type="email"
//                                 placeholder="m@example.com"
//                                 required
//                             />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="password">Password</Label>
//                             <Input
//                                 id="password"
//                                 name="password"
//                                 {...register("password", { required: "Password is required" })}
//                                 type="password" />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="confirmPassword">Confirm Password</Label>
//                             <Input
//                                 id="confirmPassword"
//                                 name="confirmPassword"
//                                 {...register("confirmPassword", { required: "Password is required" })}
//                                 type="password" />
//                         </div>
//                         <Button type="submit" className="w-full">
//                             Create an account
//                         </Button>
//                     </div>
//                 </form>
//                 <div className="mt-4 text-center text-sm">
//                     Already have an account?{" "}
//                     <Link href="/login" className="underline">
//                         Sign in
//                     </Link>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }
