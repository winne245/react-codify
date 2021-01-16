import React, { useCallback } from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
// import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import Link from '@material-ui/core/Link';
// import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SidebarList from './Code-Sidebar';
import AceTextEditor from "./AceEditor";
// import DetailCode from '../components/Detail-Code';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

export const defaultDrawerWidth = 600;
const minDrawerWidth = 75;
const maxDrawerWidth = 10000;

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
  },
  toolbar1: theme.mixins.toolbar,
  dragger: {
    width: "5px",
    cursor: "ew-resize",
    padding: "4px 0 0",
    borderTop: "1px solid #ddd",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "#f4f7f9"
  },

  root: {
    display: 'flex',
  },
  toolbar: {
    marginTop: -10,
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    height: 45,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  // menuButton: {
  //   marginRight: 36,
  // },
  // menuButtonHidden: {
  //   display: 'none',
  // },
  // title: {
  //   flexGrow: 1,
  // },
  drawerPaper: {
    position: 'relative',
    flexDirection: 'row',

  },
  // drawerPaperClose: {
  //   overflowX: 'hidden',
  //   width: theme.spacing(7),
  //   [theme.breakpoints.up('sm')]: {
  //     width: theme.spacing(7),
  //   },
  // },
  appBarSpacer: {
    height: 48,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  // container: {
  //   paddingTop: theme.spacing(4),
  //   paddingBottom: theme.spacing(4),
  // },
  // paper: {
  //   padding: theme.spacing(2),
  //   display: 'inline-flex',
  //   overflow: 'auto',
  //   backgroundColor: '#fff',
  // },
  // fixedHeight: {
  //   height: 240,
  // },
}));

export default function Code() {
  const classes = useStyles();

  const [drawerWidth, setDrawerWidth] = React.useState(defaultDrawerWidth);

  const handleMouseDown = (e) => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseMove = useCallback((e) => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setDrawerWidth(newWidth);
    }
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{paper: clsx(classes.drawerPaper),}}
        PaperProps={{ style: { width: drawerWidth }}}
      >
        <div className={classes.toolbar1} />
        <div
          onMouseDown={(e) => handleMouseDown(e)}
          className={classes.dragger}
        />
        <SidebarList/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

            <p>Tiếng ViệtCho 2 số rất lớn a và b thể hiện bằng 2 xâu kí tự

              Hãy đưa ra tích của 2 số trên

              Các ngôn ngữ đều hỗ trợ bigInt, vì vậy bài này chỉ hỗ trợ ngôn ngữ C++

              Ví dụ:

              Với a = "12", b = "11", thì bigintProduct(a, b) = "132"
              Đầu vào, đầu ra:

              Đầu vào: string a, b
              Guaranteed constraints:
              Đầu ra: string 
              Tích của 2 số a và b
              Nếu bạn chưa biết cách nộp bài trên hệ thống thì có thể đọc phần câu hỏi tại đây.
              
              Hãy đưa ra tích của 2 số trên

              Các ngôn ngữ đều hỗ trợ bigInt, vì vậy bài này chỉ hỗ trợ ngôn ngữ C++

              Ví dụ:

              Với a = "12", b = "11", thì bigintProduct(a, b) = "132"
              Đầu vào, đầu ra:

              Đầu vào: string a, b
              Guaranteed constraints:
              Đầu ra: string 
              Tích của 2 số a và b
              Nếu bạn chưa biết cách nộp bài trên hệ thống thì có thể đọc phần câu hỏi tại đây.
              
              Hãy đưa ra tích của 2 số trên

              Các ngôn ngữ đều hỗ trợ bigInt, vì vậy bài này chỉ hỗ trợ ngôn ngữ C++

              Ví dụ:

              Với a = "12", b = "11", thì bigintProduct(a, b) = "132"
              Đầu vào, đầu ra:

              Đầu vào: string a, b
              Guaranteed constraints:
              Đầu ra: string 
              Tích của 2 số a và b
              Nếu bạn chưa biết cách nộp bài trên hệ thống thì có thể đọc phần câu hỏi tại đây
            </p>

        </main>      
      </Drawer>    
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <AceTextEditor />
      </main> 
    </div>
  );
}




//   < !DOCTYPE html >
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Document</title>
//             <style>
//               * {
//                 margin: 0;

//         }

//         a {
//                 text - decoration: none;
//             color: white
//         }

//         .container {
//                 display: flex;
//             justify-content: center;
//             align-items: center;
//         }

//         .confirmation {

//                 background - color: grey;
//             padding: 15px;
//         }

//         .confirmation__title {
//                 color: white;
//             margin: auto;
//         }

//         .confirmation__button {
//                 padding: 10px;

//             background-color: teal;
//             text-align: center;
//             border-radius: 50px;
//             width: 200px;
//             justify-self: center;
//         }

//     </style>
// </head>
//           <body>
//             <div class="container">
//               <div class="confirmation">
//                 <div class="confirmation__title">
//                   <h1><%= subject %></h1>
//                   <!-- <h1>Verify your email address</h1> -->
//             </div>
//                 <div class="confirmation__button">
//                   <a style="height: 200px; width: 200px; background-color: teal;" href="http://<%= domain%>/activate/<%=confirmToken%>">Verify Email Address</a>
//                 </div>
//               </div>
//             </div>
//           </body>
// </html>