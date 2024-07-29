import { useState, useEffect, useRef } from 'react'
import './App.css'

const App = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({})

  const fetchData = async () => {
    try {
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

  const Modal = () => {
    return (
      <div>
        <p>{film.description}</p>
      </div>
    )
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (film) => {
    setOpen(true);
      // console.log(film.description)
      setSelected(film)

      // useRef(film.description)
      // {film.description}
  };

  return (
    <>
      <h1>Studio Ghibli Films</h1>

      {errorMsg !== "" && (
        <p>{errorMsg}</p>
      )}
  <div id='filmContainer'>
      {allFilms.map((film, index) => {
        return (
          <div className='films' key={index}>
            {/* <h3 id='title'> {film.title}</h3> */}
            <img className='img' onClick={() => handleClick(film)} src={film.image}></img>
          </div>
        )
      })}
      </div>
      {open && (
        <div className='modal'>{/* add ref */}
          <p>{selected.description}</p>
          <button id='close' onClick={handleClose}>Close</button>
        </div>
      )}
    </>
  )
}

export default App
