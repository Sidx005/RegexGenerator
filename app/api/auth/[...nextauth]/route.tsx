import db from "@/app/lib/db/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from 'bcrypt';
const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    CredentialsProvider({
      name:'Credentials',
      credentials:{
       
        email:{label:'Email',type:'email'},
        password:{label: "Password", type: "password"},

        // otp:{}
      },
      async authorize(credentials, req) {
       const {email,password}=credentials as{email:string,password:string}
        if(!email || !password){
          return null;
        }
        const user=await db.user.findUnique({where :{email:credentials?.email}})

        if(!user) throw new Error('Invalid credentials')

        const isValid=await bcrypt.compare(password,user.password)
        if(!isValid) return null

        return {
          id:user.id,
          name:user.name,
          email:user.email
        }
       return user
      },

    })
  ],
  
  secret: process.env.NEXTAUTH_SECRET,
});

// Must export GET and POST
export { handler as GET, handler as POST };
