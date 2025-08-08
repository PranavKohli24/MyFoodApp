import { CreateUserPrams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig={
    endpoint:process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform:"com.pranav.foodordering",
    projectId:process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId:'68951a7800004bab3fa3',
    userCollectionId:'68951ab7002d28bd5308'
}

export const client=new Client();

client.setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)


export const account=new Account(client);

export const databases=new Databases(client);

const avatars=new Avatars(client);

export const createUser=async({email,password,name}:CreateUserPrams)=>{

    try{
        const newAccount:any= await account.create(ID.unique(),email, password)

        if (!newAccount) throw Error;

        await signIn({email,password});

        const avatarUrl:any= avatars.getInitialsURL(name)

        const newUser:any= await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {email,name,accountId:newAccount.$id,avatar:avatarUrl}
        );

        return newUser;

        


    }catch(err){
        throw new Error(err as string)
    }

}


export const signIn=async({email,password}:SignInParams)=>{

    try{
        const session=await account.createEmailPasswordSession(email,password)
    }catch(err){
        throw new Error(err as string)
    }
}


export const getCurrentUser=async()=>{
    try{
        const currentAccount:any= await account.get();
        if(!currentAccount) throw Error;

        const currentUser=await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];


    }catch(err){
        throw new Error(err as string)
    }
}