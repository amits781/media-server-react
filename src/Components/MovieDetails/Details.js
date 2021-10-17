import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Chip, Rating } from "@mui/material";
import './Details.css';
import { useParams } from "react-router-dom";
import { getImagePath , getPosterImagePath} from '../Utils/Utils';
import HomeIcon from '@mui/icons-material/Home';
// import axios from 'axios';
import {getServerIP} from "../Utils/Utils";

function Details() {

  let {id} = useParams();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
  //creating IP state
  // const [ip, setIP] = useState('');

  //creating function to load ip address from the API
  // const getData = async () => {
  //   const res = await axios.get('https://geolocation-db.com/json/')
  //   console.log(res.data);
  //   setIP(res.data.IPv4)
  // }

  var style = {
    box: {
      padding: "150px 0px",
    }
  }

  useEffect(() => {
    fetch(`http://${getServerIP()}:8080/movies/${id}`)
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
  },[])

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
                <h1>{items.movieName}</h1>
              </div>
              <div className="info">
                <Rating name="read-only" value={items.rating/2} readOnly />
                <p>
                  {items.genre?.map(genre => <Chip style= {{color: "white"}} label={genre.name} variant="outlined" />
                    )}
                </p>
              </div>
              <div className="desc">
                <p>{items.description}</p>
              </div>
              <video width="80%" height="95%" poster={getImagePath(items.backDropImage)} controls>
                  <source src={items.moviePath} type="video/mp4"/>
                  Your browser does not support the video tag.
                </video>
            </div>
            </Grid>
            <Grid item display={{ xs: "none", lg: "block" }} xs={1} sm={2} md={3} lg={3}>
            <div className="right_container">
                <img src={getPosterImagePath(items.posterImage)} alt="Poster"></img>
            </div>
            </Grid>
        </Grid>
        </div>
      </Box>
    );
  }
}

export default Details;
