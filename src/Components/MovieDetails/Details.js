import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Chip, Rating } from "@mui/material";
import './Details.css';
import { useParams } from "react-router-dom";
import { getImagePath , getPosterImagePath} from '../Utils/Utils';
import HomeIcon from '@mui/icons-material/Home';

function Details() {

  let {id} = useParams();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  var style = {
    box: {
      padding: "150px 0px",
      // backgroundImage: `url(${Background})`,
    }
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c67f5d2a41ecf5fdf236291e8c7e3fc0`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box sx={{ flexGrow: 1 }} style={style.box}>
        <div className="container_main">
        <a href="/"><HomeIcon  sx={{ color: "white" , marginLeft : "30px"}}/></a>
          
        <Grid
          container
          columns={{ xs: 1, sm: 4, md: 6, lg: 12 }}
          
        >
          <Grid item xs={1} sm={4} md={6} lg={9}>
            <div className="left_container">
              <div className="heading">
                <h1>{items.title}</h1>
              </div>
              <div className="info">
                <Rating name="read-only" value={items.vote_average/2} readOnly />
                <p>
                  {items.genres?.map(genre => <Chip style= {{color: "white"}} label={genre.name} variant="outlined" />
                    )}
                </p>
              </div>
              <div className="desc">
                <p>{items.overview}</p>
              </div>
              <video width="80%" height="95%" poster={getImagePath(items.backdrop_path)} controls>
                  <source src="https://www.w3schools.com/html/movie.mp4" type="video/mp4"/>
                  Your browser does not support the video tag.
                </video>
            </div>
            </Grid>
            <Grid item display={{ xs: "none", lg: "block" }} xs={1} sm={2} md={3} lg={3}>
            <div className="right_container">
                <img src={getPosterImagePath(items.poster_path)}></img>
            </div>
            </Grid>
        </Grid>
        </div>
      </Box>
    );
  }
}

export default Details;
