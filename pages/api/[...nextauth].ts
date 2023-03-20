import NextAuth from "next-auth";
import Credentails from "next-auth/providers/credentials";
import prismadb from "../../lib/prismadb";
import {compare} from "bcrypt";

export default NextAuth({
    providers:[
        Credentails({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email:{
                    label: 'Email',
                    type: 'text',
                },
                password:{
                    label: 'Password',
                    type: 'password',
                },
            },

            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Missing email or password')
                }

                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                });

                if(!user || !user.hashedPassword){
                    throw new Error('Email does not exist')
                }

                const isValid = await compare(credentials.password, user.hashedPassword);

                if(!isValid){
                    throw new Error('Invalid password')
                }
                return user;
            }   
         })
    ],
    pages:{
        signIn:'/'
    },
    debug: process.env.NODE_ENV === 'development',
    session:{
        strategy:'jwt',
    },
    jwt:{
        secret: process.env.JWT_SECRET,
    }
})