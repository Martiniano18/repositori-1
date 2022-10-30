import React, { Component } from 'react';
import Card from '../../components/card/Card';
/* import Header from '../../components/header/Header'; */

class Encartel extends Component {
   
  constructor() {
    super();
    this.state = {
      cargando: true,
      encartel: [],
    };
  }    

 componentDidMount(){

        const encartel = "https://api.themoviedb.org/3/movie/now_playing?api_key=fcb65972de75954111563f90b05f9fed"
        fetch(encartel)
            .then((res)=> res.json())
            .then(datos =>{ 
                console.log(datos)
                 return this.setState({
                encartel: datos.results,
                more: datos.page
            })})
            .catch( err => console.log(err))
 }


 agregarMas(){
  const more = `https://api.themoviedb.org/3/movie/popular?api_key=c0945689b0a582e110971301d6ea8be2&language=es&page=${this.state.more+1}`
  fetch(more)
      .then((res)=>res.json())
      .then(data=>this.setState({
          more:data.page,
          encartel: this.state.encartel.concat(data.results)
      }))
      .catch((error)=>{console.log(error)})
}
borrarTarjetaCartel(id){
  
  const resto= this.state.encartel.filter(encartel=>  encartel.id !== id)
  this.setState({
    encartel: resto
  })
}

  render() {
    return ( 
<>
    <div class="titulo">
          <h2>• PELÍCULAS EN CARTEL •</h2>
          <button onClick={()=>this.agregarMas()} >Ver Más Peliculas</button>
    </div>
    <section className='contenedor1'>
            {this.state.cargando === false ? (
             <p>Cargando</p>
            ) : (
            this.state.encartel.map(pelicula =>(
             <Card key={pelicula.id}
              pelicula={pelicula}
              borrarCard={(personajeBorrar) => this.borrarTarjeta(personajeBorrar)}/>)
          )
           )  
            }
    </section>
</>
 
    )      
  }
}

export default Encartel