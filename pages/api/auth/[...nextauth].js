import User from "@/backEnd/model/user";
import { verifyPassword } from "@/backEnd/utils/auth";
import ConnectionDB from "@/backEnd/utils/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
    session: { strategy: 'jwt' },

    providers: [
        CredentialsProvider({
            // name: 'Credentials',
            // credentials: {
            //     email: { label: "Email", type: "text", placeholder: "Enter your email" },
            //     password: { label: "Password", type: "password" }
            // },
            async authorize(credentials, req) {
                const { email, password } = credentials;
                try {
                    await ConnectionDB();
                } catch (error) {
                    console.log(error);
                    throw new Error('Error: Connecting to the database');
                };

                if (!email || !password) throw new Error('Invalid data');
                const user = await User.findOne({ email });
                if (!user) throw new Error('User is not defined');
                const resultPass = await verifyPassword(password, user.password);
                if (!resultPass) throw new Error('Username or passowrd is inprrect');
                return { email };
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),

    // pages:{
    //     signIn:'/login'
    // }
}

export default NextAuth(authOptions);