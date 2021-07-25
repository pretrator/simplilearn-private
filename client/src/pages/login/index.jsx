import { createUseStyles } from 'react-jss'
import { useLogin } from './useLogin';
import { Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const useStyles = createUseStyles({
  loginBase:{
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  inputContainer: {
      display: 'flex',
      width: '30%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '70px',
      marginBottom: '16px'
  },
  buttonContainer: {
    width: '200px',
    display: 'flex',
    justifyContent: 'space-between',
  }
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { email, password, setEmail, setPassword, onSubmit, onRegister } = useLogin(history);
  return (
    <div className={classes.loginBase}>
        <div className={classes.inputContainer}>
            <Input value={email} onChange={(event) => setEmail(event.target.value)} placeHolder="Enter Email"/>
            <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeHolder="Enter Password"/>
        </div>
        <div className={classes.buttonContainer}>
            <Button size='large' type="ghost" onClick={onSubmit}>Submit</Button>
            <Button size='large' type="primary" onClick={onRegister}>Register</Button>
        </div>
    </div>
  );
}

export default Login;
