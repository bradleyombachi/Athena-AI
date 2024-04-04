import React, {useState, useEffect} from 'react'
import FileUpload from './components/FileUpload';


const App = () => {
  const [data, setData] = useState([])

useEffect(()=> {
  async function fetchData() {
    console.log(import.meta.env.VITE_API_URL)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}`)

      if (!response.ok) {
        throw new Error('Network response was not ok');

      }
      const result = await response.json();
      console.log(result)
      setData(result);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

    fetchData();

}, []);



  return (
    <div >
      <FileUpload />
    </div>
  )
}

export default App