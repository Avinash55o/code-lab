import { useState } from "react"

// STEP 1: Type of response coming from backend
// Backend sends { likes: number }
type likeResponse = {
  likes: number;
}

function LikeButton() {
  // STEP 2: Store current likes count (UI state)
  const [likes, setLikes] = useState<number>(0);
  // STEP 3: Track if request is in progress
  // Used to avoid double clicking
  const [loading, setLoading] = useState<boolean>(false);

  // STEP 4: Function that runs when user clicks Like button
  const HandleLikes = async () => {
    // STEP 5: Prevent multiple requests while one is running
    if (loading) return;

    // STEP 6: Lock the button (so loading becomes true)
    setLoading(true);

    // STEP 7: Save old value (for rollback if API fails)
    const previousLike = likes;
    // STEP 8: Optimistic update
    // Update UI immediately before backend response
    setLikes(likes + 1);

    try {
      // STEP 9: Call backend POST /like API
      const res = await fetch('http://localhost:3000/like', {
        method: "post",
      });

      // STEP 10: If request fails, throw error
      if (!res) {
        throw new Error("Request faild");
      };

      // STEP 11: Read backend response
      const data: likeResponse = await res.json();

      setLikes(data.likes);

    } catch (error) {
      // STEP 13: Rollback UI if backend fails in the catch part
      setLikes(previousLike);
      console.error('faild to like, roll back')
    } finally {
      // STEP 14: Unlock button (runs always)
      setLoading(false)
    }
  }

  return (
    <div>
      {/* STEP 15: Show likes */}
      <p>like:{likes}</p>
      {/* STEP 16: Disable button while request is running */}
      <button onClick={HandleLikes} disabled={loading}>
        like
      </button>
    </div>
  )
}

export default LikeButton;
