import React, {Component} from 'react';
import './App.css';
import Movierow from './Movierow';
import $ from 'jquery'


class App extends Component {

  constructor (props){
    super(props)
    this.state={}

    //console.log('Este es mi arrancador')

 //   const movies =[
 //     {id:'0', poster_src:"https://image.tmdb.org/t/p/w185_and_h278_bestv2/q6Q81fP4qPvfQTH2Anlgy12jzO2.jpg", 
//      title: "Avengers: Infinity War", overview : "As the film......."},
 //     {id:'1', poster_src:"https://image.tmdb.org/t/p/w185_and_h278_bestv2/3Lz6h5rlCFNNyCZRaRJ2ZjtBnAE.jpg",
 //      title: "The Avengers: Era Ultron", overview : "As the film bla bla......."},
 //   ]
//
 //   var movieRows = []
 // movies.forEach((movie)=>{
 //   console.log(movie.title)
 //   const movieRow = <Movierow movie={movie} />
 //   movieRows.push(movieRow)
 // })
//
 // this.state = {rows:movieRows}

    this.performSearch("woman")
  }

  performSearch (searchTerm){
    console.log('performance search using moviDB')
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm
    $.ajax({
      url:urlString,
      success: (searchResult) => {
        console.log ("Fetched data succesfuly")
       // console.log(searchResult)
        const results = searchResult.results
        //console.log(results[0])

        var movieRows = []

        results.forEach((movie)=>{
          movie.poster_src="http://image.tmdb.org/t/p/w185" + movie.poster_path
          //console.log(movie.poster_path)
          const movieRow = <Movierow key={movie.id} movie={movie} />
          movieRows.push(movieRow)
        })

        this.setState({rows:movieRows})
      },
      error: (xrh, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObjet = this
    const searchTerm=event.target.value
    boundObjet.performSearch(searchTerm)
  }


  render() {
  return (
    <div className="App">
      <table className="titleBar">
        <tbody>
          <tr>
            <td>
            <img alt="app icon" width="50" src="iconopeliculas2.png" />
            </td>
            <td width="8" />
            <td>
             <h3> Utilizando la APPI de Movies DB Search creado en ReactJS por Marcelo Gutierrez 2019  </h3>
            </td>
          </tr>
        </tbody>
      </table>

      <input style={{
        fontSize:18,
        display:'block',
        width:"99%",
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:16
      }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search" />

      {this.state.rows}

    </div>
  );
}
}

export default App;
