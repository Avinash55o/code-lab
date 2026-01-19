//step1: import react hooks useState, useEffect
import { useState, useEffect } from 'react';

function Ratelimitedbutton() {
  //step2: state definitions for the disable and retryIn
  const [disable, setdisable]=useState<boolean>(false);
  const [retryIn, setRetryIn]=useState<number | null>(null);

  //step3: Now we will call backend api with async function
  const callApi= async()=>{
    try {
      //step4: send post request to the backend
      const res= await fetch("http://localhost:3000/action",{
        method:"post",
      });

      //step5: if res is 429 then it should able to handle
      if(res.status === 429){
        //store the res.headers.get("Retry-After") in retryafter.
        const retryafter= Number(res.headers.get("Retry-After"))
        //set button to disable
        setdisable(true);
        //set retryin to retryafter
        setRetryIn(retryafter);
        return;
      }
      //handle the successfull request
      alert("request successfull")
    } catch (error) {
      //step6: if the res faild then it should be a network error 
      alert("Network error!")
    }
  }

  //step7: countdown timer effect
  useEffect(()=>{
    //if retry is null then do nothing\
    if(retryIn === null) return;

    //step8: re-enable the button if the retryin reach '0' then setdisable to false, retryin to null and try callapi
    if(retryIn === 0){
      setdisable(false);
      setRetryIn(null);
      return;
    }

    //step9: to show the countdown we will add a timer
    const timer= setTimeout(() => {
      setRetryIn(prev => (prev !== null ?prev-1:null))
    },1000);

    //step10: Now cleanup timer
    return ()=> clearTimeout(timer);
  },[retryIn]);

  //step11: Render UI where button triggers callapi and disable is disable
     // Also a countdown message showdown
  return (
    <div>
      <button onClick={callApi} disabled={disable}>
        send Request
      </button>
      {
        retryIn !== null &&(
          <p style={{color:'red'}}>
            retrying in {retryIn} seconds...
          </p>
        )
      }
    </div>
  )
}

export default Ratelimitedbutton;
