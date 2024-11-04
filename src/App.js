import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [food, setfood] = useState('');
  const [suggestionList, setsuggestionList] = useState([]);
  const [bucketList, setbucketList] = useState([]); 
   
  const handleInput = (e) => {
    console.log(e.target.value);
    setfood(e.target.value);
  }
  
  const fetchItems = async (food) => {
    const url = `https://api.frontendeval.com/fake/food/${food}`
    const res = await fetch(url);
    const data = await res.json();
    setsuggestionList(data);
  }
  // console.log(suggestionList);
  useEffect(() => {
    if (food.length >= 2) {
      fetchItems(food);
    }
    
  }, [food]);

  const handleSuggestionList = (e) => {
    const idx = e.target.getAttribute('data-id');
    if (idx) {
      const obj = {
        id: Date.now(),
        data: suggestionList[idx],
        isDone: false,  // toggle ke liye
      }
      const copybucketList = [...bucketList];
      copybucketList.push(obj);
      setbucketList(copybucketList);
    }
    setfood('')
  }
  console.log(bucketList);

  const handleRight = (id) => {
    const copybucketList = [...bucketList];
    const newbucketList = copybucketList.map((item) => {
      if (item.id == id) {
        item.isDone = !item.isDone
      }
      return item;
    })
    setbucketList(newbucketList);
  }
  

  const handleDelete = (id) => {
    //filter ka use hoga
    const copybucketList = [...bucketList];
    const newList = copybucketList.filter((item) => item.id != id) //jo bhi humne click kia usko chod kar naye list main store hongi
    setbucketList(newList);
  }
  

  return (
    <div className="App">
      <h1 className='heading'>Quick Suggest</h1>

      {/* input ko maintain kia  */}
      
      <div className='input'>
        <input type="text" placeholder="" value={food} onChange={handleInput}/>
      </div>


 {/* suggestionList ko maintain kia */}
      
      {
        food.length>=2 ? <div className='suggestionList' onClick={handleSuggestionList}>
        {
          suggestionList.map((item,index) => {
          return  <div data-id={index} className='suggestions'>{item}</div>  //is pe onclick nahin laga sakte bcz bhoth sare items hai har ek pe onclick nahin laga sakte toh seedha parent pe he onclick laga denge. 
          })
            }
      </div> : null
      }

{/* bucketList maintained Here */}

      <div className='bucketList'>
        {
          bucketList.map((item) => {
            return <div className='items'>
              <button onClick={() =>handleRight(item.id)}>✓</button>
              <div className={item.isDone ? 'strike' : "" }>{item.data}</div>
                <button onClick={()=>handleDelete(item.id)}>X</button>
              </div>
            })
        }
        
      </div>
    </div>
  );
}

export default App;
