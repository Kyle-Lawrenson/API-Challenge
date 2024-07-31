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
    setSelected(film)
  };

  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current === event.target) {
      handleClose();
    }
  };

  const ddFilter = (filter) => {
    let filmCopy = [...allFilms]
    if (filter === 'Sort Name') {
      filmCopy.sort((a,b) => a.title.localeCompare(b.title))
      
    }
    else if (filter === 'Sort Year') {
      filmCopy.sort((a,b) => a.release_date-b.release_date)
    }

      else if (filter === 'Sort Length') {
        filmCopy.sort((a,b) => a.running_time-b.running_time)
      }

    setAllFilms(filmCopy)}

    const [ddOpen, setDdOpen] = useState(false);
    const filters = ['Sort Name', 'Sort Year', 'Sort Length'];

    return (
      <>
        <h1>Studio Ghibli Films</h1>

        <div id='dd'>

          <button id='filter' onClick={() => setDdOpen(!ddOpen)}>Filter</button>
          {ddOpen && (

            <div id='filterDd'>

              {filters.map(filter => (
                <button id='ddBtns' key={filter} onClick={() => ddFilter(filter)}>
                  {filter}
                </button>
              ))}

            </div>
          )}
        </div>


        {errorMsg !== "" && (
          <p>{errorMsg}</p>
        )}
        <div id='filmContainer'>

          {allFilms.map((film, index) => {

            return (
              <div className='films' key={index}>
                <img className='img' onClick={() => handleClick(film)} src={film.image}></img>
              </div>
            )

          })}
        </div>

        {open && (
          <div className='modalBg' ref={modalRef} onClick={handleClickOutside}>

            <div className='modal'>

              <img id='banner' src={selected.movie_banner}></img>

              <div className='title'>
                <h2>{selected.title}</h2>
                <h2>-</h2>
                <h2>{selected.original_title}</h2>
              </div>

              <div className='release'>
                <h3>Release Date:{selected.release_date}</h3>
                <h3>Run time:{selected.running_time} minutes.</h3>
              </div>

              <p>{selected.description}</p>
              <button id='x' onClick={handleClose}>X</button>
              <button id='close' onClick={handleClose}>Close</button>

            </div>
          </div>
        )}
      </>
    )
  }

export default App
