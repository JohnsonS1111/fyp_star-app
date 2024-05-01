import GoogleProvider from "next-auth/provider"

const options = {
    providers: [
        GoogleProvider({
            profile(profile) {
              console.log("Google profile: ", profile);
      
      
              return {
                ...profile,
               
              
              };
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_Secret,
          }),
    ]
}