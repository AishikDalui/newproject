import React, { useEffect, useState } from 'react'
import {Container,PostCard} from '../components'
import appwirteService from '../appwrite/config'

export default function AllPosts(props) {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        
    }, [])

    appwirteService.getPosts([]).then((posts)=>{
        if (posts){
            setPosts(posts.documents)
        }
        
    })

    return (
        <div className='w-full py-8'>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post} />
                </div>
                )
                )}
                
                </div>            
        </div>
    )
}
