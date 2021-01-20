// Material style
import { Paper, StylesProvider } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import firebase from "firebase";
import React, { useEffect } from "react";
// Loading page
import { WaveLoading } from "react-loadingg";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch as SwitchRouter,
} from "react-router-dom";
import axiosCodify from "./api/axios";
// Custom style
import "./App.css";
import { theme } from "./assets/styles/style";
import Classroom from "./components/features/Classroom/Classroom";
import Homepage from "./components/features/Homepage/Homepage";
import Lesson from "./components/features/Lesson/Lesson";
import Practice from "./components/features/Practice/Practice";
// Components
import Header from "./components/shares/Header/Header";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
import NotFound from "./components/shares/NotFound/NotFound";
// const Homepage = React.lazy(() => import("./components/features/Homepage/Homepage"));
// const Classroom = React.lazy(() => import("./components/features/Classroom/Classroom"));
// const Practice = React.lazy(() => import("./components/features/Practice/Practice"));
// <Suspense fallback={<WaveLoading color={state.isDarkMode ? purple[500] : purple[200]} size="large"/>}></Suspense>
// Context
import { useStateValue } from "./context/StateProvider";
import { ACTION_TYPE } from "./reducers/reducer";
// Styles
import "./styles.css";

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // ...
};
firebase.initializeApp(config);

function App() {
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    // document.title = "Codify";
    setTimeout(() => {
      dispatch({ type: ACTION_TYPE.FINISH_LOADING });
    }, 0);
  }, []);

  // const [user, setUser] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const authenticate = async () => {
        try {
          const response = await axiosCodify.get("/authenticate");
          dispatch({ type: ACTION_TYPE.USER, payload: response });
          dispatch({ type: ACTION_TYPE.SIGN_IN });
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      };
      authenticate();
      // const decoded = jwt_decode(localStorage.getItem("accessToken"));
      // state.user = decoded.payload;
    }
  }, [state.isSignIn]);

  // useEffect(() => {
  //   if (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")) {
  //     dispatch({ type: ACTION_TYPE.SIGN_IN });
  //   }
  // }, []);

  //handle firebase auth change
  // useEffect(() => {
  //   const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
  //     if (!user) {
  //       console.log('Login fail!');
  //       return;
  //     }
  //     dispatch({ type: ACTION_TYPE.SIGN_IN });
  //     console.log('Logged in user: ', user.displayName);
  //     const token = await user.getIdToken();
  //     console.log('Logged in user token: ', token);
  //   });
  //   return () => unregisterAuthObserver();
  // }, []);

  // check login
  // useEffect(() => {
  //   if (!localStorage.getItem("accessToken")) {
  //     console.log('Login fail!');
  //     return;
  //   }
  //   dispatch({ type: ACTION_TYPE.SIGN_IN });
  // }, []);
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme(state.isDarkMode)}>
        <Paper
          style={{
            minHeight: "100.1vh",
            backgroundColor: state.isDarkMode ? "#353535" : "#f0f2f5",
          }}>
          <div className="app">
            {state.isLoading ? (
              <WaveLoading color={"#3578E5"} size="large" />
            ) : (
              <>
                <Router>
                  {/* <Grid container direction="row" justify="center" alignItems="center"> */}
                  {/* <Detail /> */}
                  {/* <Demo /> */}
                  <Header />
                  <SwitchRouter>
                    <Redirect exact from="/" to="/homepage" />
                    <Route path="/homepage" component={Homepage} />
                    <Route path="/classrooms" component={Classroom} />
                    <Route path="/lesson" component={Lesson} />
                    <Route path="/practice" component={Practice} />
                    <Route path="/social" component={Practice} />
                    <Route component={NotFound} />
                  </SwitchRouter>

                  {/* <Switch>
                      <Redirect exact from="/" to="/homepage" />
                      {routes.map((route) => (
                        <Route
                          key={route.path}
                          path={route.path}
                          component={route.component}
                        />
                      ))}
                    </Switch> */}
                  {/* <Footer /> */}
                  {/* <Scroll showBelow={300} /> */}
                  {/* </Grid> */}
                </Router>
              </>
            )}
          </div>
        </Paper>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
