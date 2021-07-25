import {createUseStyles} from 'react-jss'
import { Provider, useStore, useSelector } from 'react-redux';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import store from './store';
import Routes from './routes';
import axios from 'axios';
import { useEffect } from 'react';
const useStyles = createUseStyles({
  app:{

  }
})
function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
        <Provider store={store}>
          <Router>
            <Routes />
            <AuthHandlerComponent/>
          </Router>
        </Provider>
    </div>
  );
}

export default App;

const AuthHandlerComponent = () => {
  const history = useHistory();
  const token = useSelector(state => state.auth?.token);
  axios.defaults.headers.post['authtoken'] = token;
  axios.defaults.headers.get['authtoken'] = token;
  useEffect(() => {
    if(!token){
      history.push('/auth');
    }
  }, [token]);
  return <></>;
}