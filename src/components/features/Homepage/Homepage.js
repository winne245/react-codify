import { CardMedia } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ClassIcon from '@material-ui/icons/Class';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import React from "react";
import { useStateValue } from "../../../context/StateProvider";


const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    paddingLeft: theme.spacing(37.5),
  },
  card: {
    maxWidth: 300,
    display: 'inline-flex',
    marginRight: 24,
  },
}));

export default function Homepage() {
  const classes = useStyles();
  const [state, dispatch] = useStateValue();
  // const [productList, setProductList] = useState([]);
  // useEffect(() => {
  //   const fetchProductList = async () => {
  //     try {
  //       const params = {
  //         _page: 1,
  //         _limit: 10
  //       };
  //       const response = await productApi.getAll(params);
  //       console.log('Fetch products successfully: ', response);
  //       setProductList(response.data);
  //     } catch (error) {
  //       console.log('Failed to fetch product list: ', error);
  //     }
  //   }
  //   fetchProductList();
  // }, []);

  return (
    <div className={classes.root}>
      {!state.isSignIn ? (
        <main>
          <CardMedia
            component="img"
            className={classes.cardMedia}
            image={require("../../../assets/images/Capture.PNG")}
          />
        </main>
      ) : (
          <>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <Toolbar />
              <div className={classes.drawerContainer}>
                <ListItem button>
                  <ListItemIcon>
                    {/* <Avatar alt="" src={require('../../../assets/images/avatar.png')} /> */}
                    <Avatar style={{ backgroundColor: '#3c87c0', height: 32, width: 32 }} >
                      {state.user.firstName.charAt(0)}
                    </Avatar>
                    {/* <Avatar alt="" src={firebase.auth().currentUser.photoURL} /> */}
                  </ListItemIcon>
                  <Typography variant="h6" style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {/* {firebase.auth().currentUser.displayName} */}
                    {/* {localStorage.getItem.accessToken("email")} */}
                    {state.user.firstName} {state.user.lastName}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home page" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <ClassIcon />
                  </ListItemIcon>
                  <ListItemText primary="Classroom" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <MenuBookIcon />
                  </ListItemIcon>
                  <ListItemText primary="Lesson" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <BorderColorIcon />
                  </ListItemIcon>
                  <ListItemText primary="Practice" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <RecentActorsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Social" />
                </ListItem>
              </div>
            </Drawer>
            <main className={classes.content}>
              <CardMedia
                component="img"
                className={classes.cardMedia}
                image={require("../../../assets/images/Capture4.PNG")}
              />
              <CardMedia
                component="img"
                className={classes.cardMedia}
                image={require("../../../assets/images/Capture2.PNG")}
              />
              <CardMedia
                component="img"
                className={classes.cardMedia}
                image={require("../../../assets/images/Capture3.PNG")}
              />
            </main>
          </>
        )}
    </div>
  );
}