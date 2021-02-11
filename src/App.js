import React from "react";
import Movie from "./Movie";
import axios from "axios";
import "./App.css";
/*
React component를 상속받은 클래스를 이용하여 화면에 노출시키기 위해서,
함수가 return값을 갖는 것 처럼 class 사용 시 render() 이라는 함수를 사용한다.
class App -> render()
*/
class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating");
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return <section class="container">
      <div id="header">
        <h1>🎬MOVIE LIST🍿</h1>
        <h4>@easybreezyyy</h4>
      </div>
      {isLoading ? (
      <div class="loader">
        <span class="loader__text">Loading...</span>
      </div> 
      ) : (
        <div className="movies">
        {movies.map(movie => (
          <Movie 
            key={movie.id}
            id={movie.id} 
            year={movie.year} 
            title={movie.title} 
            summary={movie.summary} 
            poster={movie.medium_cover_image} 
            genres={movie.genres}/>
      ))}
        </div>
      )}
    </section>
  }
}

export default App;