import React, {Component} from 'react';
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom'



class Home extends Component {

  constructor() {
    super();
    this.state = {
      cargando: true,
      populares: [],
      encartel: [],
      favoritos: [],
      filterBy:'',
      results: [],
    }
  }    

 componentDidMount(){

    if (localStorage.length > 0) {
     this.setState({ favoritos: JSON.parse(localStorage.getItem('favoritos')) || [''] })
   } else {
     localStorage.setItem('favoritos', JSON.stringify(this.state.favoritos))
   }

    const populares = "https://api.themoviedb.org/3/movie/popular?api_key=fcb65972de75954111563f90b05f9fed"
    fetch(populares)
        .then((res)=> res.json())
        .then(datos =>{ 
            console.log(datos)
             return this.setState({
            populares: datos.results.slice(0,12),
        })})
        .catch( err => console.log(err))

        const encartel = "https://api.themoviedb.org/3/movie/now_playing?api_key=fcb65972de75954111563f90b05f9fed"
        fetch(encartel)
            .then((res)=> res.json())
            .then(datos =>{ 
                console.log(datos)
                 return this.setState({
                encartel: datos.results.slice(0,12),
            })})
            .catch( err => console.log(err))
      
    
 }

 handleFavoritos(card){
  if (this.state.favoritos.some(fav => card.id === fav.id)) {
      this.setState({favoritos: this.state.favoritos.filter(item => item.id !== card.id)}, () => {//asincronismo del this.State ",()"
          localStorage.setItem("favoritos", JSON.stringify(this.state.favoritos))
      })
      console.log(this.state.favoritos.filter(item => item.id !== card.id))
  } else {                                                               
      this.setState({favoritos: [...this.state.favoritos, card]}, () => { //el "..." significa traeme todo lo que estaba en el array favoritos y el ", card" significaa que le agrego la nueva card que te estoy pasando
          localStorage.setItem("favoritos", JSON.stringify(this.state.favoritos))
      })
  }
}

filtrarPeliculas(filtro){

  const url = `https://api.themoviedb.org/3/search/movie?api_key=fcb65972de75954111563f90b05f9fed&language=es&query=${filtro}`
  fetch(url)
      .then((res)=> res.json())
      .then(datos =>{ 
          console.log(datos)
          this.setState({
            results: datos.results
          })
      })
      .catch( error => console.log(error))
      
}

handleChange(e){
  if (e.target.value.length === 0) {
    e.preventDefault()
    this.setState({
       filterBy: '',
        results:[]})
} else {
    this.setState({
      filterBy: e.target.value}, ()=>{this.filtrarPeliculas(this.state.filterBy)
      })
}
    /* console.log (e.target.value) */
 }


 borrarTarjeta(id){

  const resto = this.state.populares.filter(populares => populares.id !== id)
  this.setState({
    populares: resto,
  })

    }

  borrarTarjetaCartel(id){
    
    const resto = this.state.encartel.filter(encartel => encartel.id !== id)
    this.setState({
      encartel: resto
    })

  }

  render() {
    return ( 
<>
   <div className='titulo'> 
        <form>
              <input type='search' name='search' placeholder='Buscar Películas...' onChange={(e)=>{this.handleChange(e)}} value={this.state.filterBy}/>
        </form>
    </div>

    {this.state.results.length  ? 
 
  <>

  <div className="titulo">
      <h2>• RESULTADOS DE BUSQUEDA •</h2>
  </div>  
      
  <section className='contenedor'>
            {this.state.cargando === false ? (
             <p>Cargando</p>
            ) : (
            this.state.results.map(results =>(
               <Card key={results.id} pelicula={results} favorito={(results)=> this.handleFavoritos(results)}/>)
           )
           )   
            }      
  </section>

  </>

    :

  <>

    <div className="titulo">
          <h2>• LO MÁS VISTO EN PELÍCULAS •</h2>
          <Link to='/populares'><button className='vermas'>Ver Mas</button></Link>
    </div>
    <section className='contenedor'>
            {this.state.cargando === false ? (
             <p>Cargando</p>
            ) : (
            this.state.populares.map(pelicula =>(
               <Card key={pelicula.id} pelicula={pelicula} favorito={(pelicula)=> this.handleFavoritos(pelicula)} borrarCard={(personajeBorrar) => this.borrarTarjeta(personajeBorrar)}/>)
           )
           )   
            }      
    </section>
    <div className="titulo">
          <h2>• PELÍCULAS EN CARTEL •</h2>
          <Link to='/encartel'><button className='vermas'>Ver Mas</button></Link>
    </div>
    <section className='contenedor1'>
            {this.state.cargando === false ? (
             <p>Cargando</p>
            ) : (
            this.state.encartel.map(pelicula =>(
             <Card key={pelicula.id} pelicula={pelicula}  favorito={(pelicula)=> this.handleFavoritos(pelicula)} borrarCard={(personajeBorrar) => this.borrarTarjetaCartel(personajeBorrar)}/>)
          )
           )  
            }
    </section>
    
    </> 
      
    }
       
</>

    )
  }
}
export default Home;