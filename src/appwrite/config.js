import conf from "../conf/conf.js";
import  { Client,ID, Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket=new Storage(this.client);

    }

    async createPost({title, slug, content, featuredImage, status, userId}){

        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
                )

        } catch (error) {
            console.log("appwrite::config.js::createPost",error);
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    
                }
                )
        } catch (error) {
            console.log("appwrite::config.js::updatePost",error);
            
        }
    }

    async deletePost(slug){
        try {
            
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug
            )

            return true

        } catch (error) {
            console.log("appwrite::config.js::deletePost",error);
            return false
            
        }

    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId, 
                slug

                );
        } catch (error) {
            console.log("appwirte::config.js::updatePost",error);
            return false
            
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    //file upload Service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log("appwrite::config.js::uploadFile",error);
            
        }

    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const appwirteService=new Service();
export default appwirteService;