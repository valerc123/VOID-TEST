import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useGetPostsIdQuery } from '../../redux/posts/api';

function Posts() {
    const router = useRouter();
    const { id } = router.query;
    const { data, isLoading} = useGetPostsIdQuery(id)
    const [postId, setPostId] = useState({});

    useEffect(() => {
        if (isLoading === false){
            setPostId(data)
        }
    }, [isLoading]);

  return (
    <>
    <div>
    {isLoading ? <p className='m-4 p-4'>Loading data...</p> : (
        <div className="p-9 m-9">
            <div className="flex">
                <div>
                    <img src={data.authorAvatar} alt="imag" width="300" height="300"/>
                </div>
                <div className="m-4">
                    <h1>{data.authorName}</h1>
                    <p>{data.postText}</p>
                </div>
            </div>
            <div className="my-5">
                <img src={data.postImage} alt="imag" width="auto" height="auto"/>
            </div>
        </div>
    )}
    </div>
    </>
  )
}

export default Posts;