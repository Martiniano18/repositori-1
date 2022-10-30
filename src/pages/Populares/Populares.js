import React, { Component } from 'react';
import Card from '../../components/card/Card';
/* import Header from '../../components/header/Header'; */

class Populares extends Component {

  constructor() {
    super();
    this.state = {
      cargando: true,
      populares: [],
    };
  }

  componentDidMount() {
    const populares = "https://api.themoviedb.org/3/movie/popular?api_key=fcb65972de75954111563f90b05f9fed"
    fetch(populares)
      .then((res) => res.json())
      .then(datos => {
        console.log(datos)
        return this.setState({
          populares: datos.results,
          more: datos.page
        })
      })
      .catch(err => console.log(err))

  }

  agregarMas() {
    const more = `https://api.themoviedb.org/3/movie/popular?api_key=c0945689b0a582e110971301d6ea8be2&language=es&page=${this.state.more + 1}`
    fetch(more)
      .then((res) => res.json())
      .then(data => this.setState({
        more: data.page,
        populares: this.state.populares.concat(data.results)
      }))
      .catch((error) => { console.log(error) })
  }

  borrarTarjeta(id) {  /* borra las cards (peliculas populares ) */

    const resto = this.state.populares.filter(populares => populares.id !== id) //sentencia que señala que va a haber un cambio de estado en la propiedad populares del componente populares
    this.setState({  //el setState actualiza el estado para que cuando se renderice la pagina se actualice esa porcion del codigo ya que posee cambios.              
      populares: resto //array igual a la variable resto
    })
  }


  render() {
    return (
      <>
        <div className="titulo">
          <h2>• PELÍCULAS POPULARES •</h2>
          <button onClick={() => this.agregarMas()} >Ver Más Peliculas</button>
        </div>
        <section className='contenedor'>
          {this.state.cargando === false ? (
            <p>Cargando</p>
          ) : (
            this.state.populares.map(pelicula => (
              <Card key={pelicula.id} 
              pelicula={pelicula}
              borrarCard={(personajeBorrar) => this.borrarTarjeta(personajeBorrar)} />)
            )
          )
          }
        </section>
      </>
    )
  }
}

export default Populares