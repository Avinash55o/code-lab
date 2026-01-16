//step 1: import the necessory modules
import { useEffect, useRef, useState } from 'react';

//step 2: types
type post = {
  id: number,
  title: string
}

function InfinitePosts() {
  /* step 3: use of state management
     *first to manage the list of posts
     *then corsor to remember the progress
     *loading state - stops the duplicate api
     *hashmore state -stops request when data ends
  */
  const [posts, setposts] = useState<post[]>([]);
  const [cursor, setcursor] = useState<number | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  const [hashmore, sethashmore] = useState<boolean>(true);

  /* *step(9): use the useref hook which points to a dom element at the bottom of the page
     *when this become visible then we know the user is at the end
  */
  const observref = useRef<HTMLDivElement | null>(null)

  // Create a fetchposts function: to fetch the next batch of posts
  const fetchPosts= async():Promise<void>=>{
    //step 4: to avoid duplicate calls or calls after data end
    if(loading || !hashmore) return;
    //step 5: then set the loding to true
    setloading(true);
    //step 6: use fetch to hit the backend
    fetch(`http://localhost:3000/posts?cursor=${cursor??0}&limit=50`).then((res)=> res.json()).then((data:{posts: post[]; nextcursor: number|null})=>{
      /*step 7: handle the posts resposnse
           *need to append the new posts to the existing posts
           *need to update the cursor
           *stop further loading if no cursor
        */
      setposts(prev=>{
        const newPost= data.posts.filter(
          newPost=> !prev.some(p=>p.id === newPost.id)
        )
        return [...prev,...newPost];
      })

      setcursor(data.nextcursor);

      if(!data.nextcursor){
        sethashmore(false)
      }
      setloading(false)
    })
  }

  //step 8: use useEffect to load the first batch of posts
  useEffect(() => {
    fetchPosts()
  }, []);

  //step 9: loading the posts are done now i need to observe the last element for infinite scroll
  useEffect(() => {
    //step 10:  we will use intersectionObserver to watch the dom element and to tell us when it enters
    const observer = new IntersectionObserver((entries) => {
      //entries[0] represents the observed element
      //isintersecting = true mean the element is visible
      if (entries[0].isIntersecting && !loading && hashmore) {
       // create a function to handle this: const fetchPosts= async():promise<void>=>{}: use this func to fetch the next posts if the element is visible
        fetchPosts()
      }

    })

    // step 11: start watching the dom element (loading more...)
    if (observref.current) {
      observer.observe(observref.current)
    }
    //stop watching when components unmount or this effect rerun
    return () => observer.disconnect();

  }, [cursor, loading, hashmore])


  return (
    <div>
      <h1>infinite scroll</h1>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
      {/* sentinel element observed for infinite scrolling */}
      {hashmore &&
        <div ref={observref}>loading more...</div>}
    </div>
  )
}

export default InfinitePosts
