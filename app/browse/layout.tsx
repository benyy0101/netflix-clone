import { SessionProvider } from "@/components/SessionProvider";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import {redirect} from "next/navigation";

const BrowseLayout = async ({children}: {children: React.ReactNode} ) => {
    
    const session = await getServerSession(authOptions);
    console.log(session);
    
    if(!session){
        redirect("/");
    }
    else{
        return(
            <SessionProvider session ={session}>
                <div className="bg-zinc-900 h-full overflow-x-hidden">
                    {children}
                </div>
            </SessionProvider>
        )
    }
}

export default BrowseLayout;