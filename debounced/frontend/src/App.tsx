import { useEffect, useState } from 'react'

function App() {
 // step1: Store the current text typed by the user
  // `query` is always a string
 const [query, setquery]= useState<string>('');

 // step2: Store the results returned by the backend
     //backend will return array of string
 const [result, setresult]= useState<string[]>([]);

 // step3 :run effect every time 'query' change
 useEffect(()=>{

  //step4: If query is empty, don't call the api
  if(!query) return;

  //step 5: start debounce timer
  const timer= setTimeout(() => {
    //send the http request to the backend
      //convert the res to json      
    fetch(`http://localhost:3000/search?q=${query}`)
     .then((res)=>res.json())
     .then((data:string[])=>{

      //step6: update the data in react state
      setresult(data);
     })
     .catch((err:Error)=>{
      console.error("search failed", err)
     })
  }, 300); //400 debounce delay

  //step7: use cleartimeout when user types again before 300ms, then cancel the previous one
  return ()=>clearTimeout(timer);
 },[query]) //effect depends on the query

  return (
    <div >
      {/* step 8: create a input box */}
      <input type="text" placeholder='search' value={query} onChange={(e)=>setquery(e.target.value)} />

      {/* step 9: results from the back */}
      <ul color='black'>
        {result.map((item, index)=>(
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
