import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useRouteMatch } from "react-router-dom";
import { useStateValue } from "../../../context/StateProvider";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  myClassTitle: {
    marginLeft: -55,
  },
  card: {
    maxWidth: 300,
    display: 'inline-flex',
    marginRight: 24,
  },
  search: {
    position: 'relative',
    border: '1px solid #633645',
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    width: 195,
    marginLeft: -48,
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  // title: {
  //   marginLeft: -60,
  //   fontSize: '1.875',
  // },
  sidebarItem: {
    width: 220,
    marginLeft: 10,
    borderRadius: 25,
    '&:hover': {
    },
  },
  listItemLightActive: {
    backgroundColor: '#eaf3ff',
    '&:hover': {
      backgroundColor: '#eaf3ff'
    },
  },
  listItemDarkActive: {
    backgroundColor: '#263951',
    '&:hover': {
      backgroundColor: '#263951'
    },
  },
  iconSidebar: {
    width: 35,
    height: 35,
    padding: 5.5,
    backgroundColor: '#3578E5',
    color: '#ffffff',
    borderRadius: 25,
    marginLeft: -5,
    marginRight: 10,
  },
  space: {
    height: 10
  }
}));

export default function Classroom() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();

  const match = useRouteMatch();
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={require('../../../assets/images/classroom.jpg')}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Abcd Abcd
                  </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
                  </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={require('../../../assets/images/classroom.jpg')}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Bcda Bcda
                  </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
                  </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </main>



    </div>
  );
}