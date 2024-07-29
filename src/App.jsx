import { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [errorMsg, setErrorMsg] = ("");

  const fetchData = async () => {
    try{
      const response = await fetch("https://ghibliapi.vercel.app/films")

      if (!response.ok) {
        throw new Error("An error has occured")
      }

    const filmsData = await response.json()
    setAllFilms(filmsData)
    setErrorMsg("")
    } catch (error) {
      console.log(error.message)
      setErrorMsg(error.message)  
    }
  }

useEffect(() => {
  fetchData()
}, [])

  return (
    <>
      <h1>Studio Ghibli Films</h1>

      {errorMsg !== "" && (
        <p>{errorMsg}</p>
      )}

      {allFilms.map((film, index) => {
        return (
          <div className='films' key = {index}>
          <h3> {film.title}</h3>
          <img src={film.image}></img>
          </div>
        )
      })}
    </>
  )
}

export default App
