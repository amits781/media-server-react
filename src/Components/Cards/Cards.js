import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip } from '@mui/material';
import { getImagePath , getPosterImagePath} from '../Utils/Utils';
import { useHistory } from 'react-router-dom'
import './Cards.css';

export default function MediaCard(props) {
  // const styleModal = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 1000,
  //   height: 575,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // };

  var style = {
    mediaCard:{
      marginLeft: "auto",
      marginRight: "auto",
      minHeight: "304.4px",
      backgroundColor: "#424242",
    },
    typographyElip: {
      maxWidth: '100%',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 3,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    movieTitle:{
      minHeight : "64px",
      maxWidth: '100%',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    // modalBackground : {
    //   backgroundColor: "#000000",
    //   backgroundImage: "linear-gradient(147deg, #000000 0%, #434343 74%)",
    //   border: '2px solid white',
    // }
  }

  const history = useHistory();

  const handleOnSubmit = () => {
    history.push(`/details/${props.id}`);
  };

  return (
    <Card style={style.mediaCard} sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleOnSubmit}>
        <CardMedia
          component="img"
          height="140"
          image={getImagePath(props.backdrop_path)}
          alt="green iguana"
          style={{borderColor: "grey", border: '2px solid'}}>
        </CardMedia>
        <CardContent>
          <Typography style={style.movieTitle} gutterBottom variant="h5" color="#f5f5f5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="#f5f5f5" style={style.typographyElip} >
            {props.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={styleModal} style={style.modalBackground}>
          <div className="container_main">
            <div className="left_container">
              <div className="heading">
                <h1>{props.title}</h1>
              </div>
              <div className="info">
                <Chip style= {{color: "white"}} label={props.vote_average} variant="outlined" />
              </div>
              <div className="desc">
                <p>{props.overview}</p>
              </div>
              <video width="320" height="240" poster={getImagePath(props.backdrop_path)} controls>
                  <source src="https://www.w3schools.com/html/movie.mp4" type="video/mp4"/>
                  Your browser does not support the video tag.
                </video>
            </div>
            <div className="right_container">
            <img src={getPosterImagePath(props.poster_path)}></img>
            </div>
          </div>
          </Box>
        </Fade>
      </Modal> */}
    </Card>
  );
}
