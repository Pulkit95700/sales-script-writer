import React, {useState, useRef} from 'react'
import getScriptData from './api/openai';
import Loader from './components/loader';
import "./App.css";

const App = () => {
  const productRef = useRef();
  const brandRef = useRef();
  const priceRef = useRef();
  const qualitiesRef = useRef();

  const [out, setOut] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(false);

  const responseHandler = async (prompt) => {
    try{
      setShowLoader(true);
      const completion = await getScriptData(prompt);
      setShowLoader(false);
      setOut(completion);
    }catch(err){
      setError(true)
      setShowLoader(false);
      console.log(err);
    }
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    let script = `Get a sales script to sell, A ${qualitiesRef.current.value} ${productRef.current.value} of ${priceRef.current.value} of brand ${brandRef.current.value}`;
    setError(false);
    responseHandler(script);
  }

  return (
    <div className='app'>
      <h3>Sales Script Writer</h3>
      <form onSubmit={formSubmitHandler}>
        <div className="form-control">
        <label>Enter Product: </label>
          <input ref = {productRef}  name='text' type="text" placeholder='e.g comb'/>
        </div>   
        <div className="form-control">
          <label>Enter Brand: </label>
          <input ref = {brandRef}  name='text' type="text" placeholder='e.g Hairo'/>
        </div>  
        <div className="form-control">
        <label>Enter Price: </label>
          <input ref = {priceRef}  name='text' type="text" placeholder='e.g 50rs'/>
        </div>        
        <div className="form-control">
        <label>Enter Qualities: </label>
          <input ref = {qualitiesRef}  name='text' type="text" placeholder='e.g plastic, long'/>
        </div>                
        <button type='submit'>Submit</button>
      </form>
      <p>Output</p>
      {showLoader && <Loader/>}
      {!showLoader && !error && <div className='output'>{out}</div>}
      {error && <p>Invalid Response</p>}
    </div>
  )
} 

export default App