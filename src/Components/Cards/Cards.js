import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea} from '@mui/material';
import { getImagePath} from '../Utils/Utils';
import { useHistory } from 'react-router-dom'
import './Cards.css';

export default function MediaCard(props) {
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
          image={getImagePath(props.backDropImage)}
          alt="green iguana"
          style={{borderColor: "grey", border: '2px solid'}}>
        </CardMedia>
        <CardContent>
          <Typography style={style.movieTitle} gutterBottom variant="h5" color="#f5f5f5" component="div">
            {props.movieName}
          </Typography>
          <Typography variant="body2" color="#f5f5f5" style={style.typographyElip} >
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
