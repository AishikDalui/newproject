import React, { useEffect, useState } from 'react'
import {PostForm,Container} from "../components"
import appwirteService from '../appwrite/config'
import {useNavigate, useParams} from "react-router-dom"

export default function EditPost(props) {
    const [post, setPost] = useState(null)
    const {slug}=useParams()
    const navigate=useNavigate();

    useEffect(() => {
        if (slug){
            appwirteService.getPost(slug).then((post)=>{
                if (post){
                    setPost(post)
                }
            })
        } 
        else{
            navigate('/')
        }
    }, [slug,navigate])
    

    return post ? (
        <div className='py-8'>
            <Container> 
                <PostForm post={post}/>
            </Container>
        </div>
    ):null
}
