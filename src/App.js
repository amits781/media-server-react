import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MediaCard from "./Components/Cards/Cards";
import {getServerIP} from "./Components/Utils/Utils";
import { getCookie } from './Components/Utils/Utils';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const cookieValue = getCookie() === undefined ? false: getCookie();
  const urlToFetchMovies = cookieValue? `http://${getServerIP()}:8080/movies?exp=true` : `http://${getServerIP()}:8080/movies?exp=false`;
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
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [urlToFetchMovies])

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
