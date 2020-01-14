import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./components/App";
import Login from "./components/Auth/login";
import Register from "./components/Auth/register";
import registerServiceWorker from "./registerServiceWorker";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import rootReducer from "./reducers";
import firebase from "./firbase";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { connect } from "react-redux";
import { setUser, clearUser } from "./actions/index";
import { Spinner } from "./hoc/spinner";

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(this.props.isLoading);
        this.props.setUser(user);
        this.props.history.push("/");
      } else {
        this.props.clearUser();
        this.props.history.push("/login");
      }
    });
  }
  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    );
  }
}
const mapstatefromprops = state => ({
  isLoading: state.user.isLoading
});

const RouterWith = withRouter(
  connect(mapstatefromprops, { setUser, clearUser })(Root)
);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RouterWith />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
