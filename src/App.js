import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MediaCard from "./Components/Cards/Cards";
import {getServerIP} from "./Components/Utils/Utils";
import { getFilterCookie } from './Components/Utils/Utils';
import { useParams } from "react-router-dom";

function App() {

  let {exp} = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const filterResult = getFilterCookie() === undefined ? false: true;
  const urlToFetchMovies = exp? `http://${getServerIP()}:8080/movies?exp=true` : `http://${getServerIP()}:8080/movies?exp=false`;
  var style = {
    box: {
      padding: "200px 0px",
    }
  }

  useEffect(() => {
    fetch(urlToFetchMovies)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          // if(exp){
          //   result.filter(movie => word.length > 6)
          // } else {
            
          // }
          if(filterResult){
            if(getFilterCookie()==='dateasc')
              result.sort((a, b) => a.id - b.id);
            else if(getFilterCookie()==='datedesc')
              result.sort((a, b) => b.id - a.id);
            else  if(getFilterCookie()==='nameasc')
              result.sort((a, b) => a.movieName.localeCompare(b.movieName));
            else if(getFilterCookie()==='namedesc')
              result.sort((a, b) => b.movieName.localeCompare(a.movieName));
          }
          setItems(result); 
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [urlToFetchMovies,filterResult])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box sx={{ flexGrow: 1 }} style={style.box}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 4, md: 6, lg: 12 }}
          
        >
          {items.map(movie => 
          {
            return <Grid item xs={1} sm={2} md={3} lg={3} key={movie.id}>
                      <MediaCard {...movie}/>
                    </Grid>
          })}
        </Grid>
      </Box>
    );
  }
}

export default App;
