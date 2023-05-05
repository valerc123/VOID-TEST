import data from "../../components/postId.json"
import Image from "next/image";
import { useEffect, useState } from "react";
//import { useRouter } from 'next/router';
//import { useGetPostsIdQuery } from '../../redux/posts/api';

function Posts() {
   // const [postId, setPostId] = useState({});

   /*  useEffect(() => {
        setPostId(data)
    }, [data]); */
  /*   console.log(data.authorAvatar) */

  return (
    <>
    <div>
        <h1>oeee </h1>
       {/*  <Image src={data.authorAvatar} alt="avatar" width={80} height={80} />
 */}

    </div>
    </>
  )
}

export default Posts;