import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { submitLogin, registerApi } from '../../api/auth'
import { SET_TOKEN } from '../../reducers/actions';

export const useLogin = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const onSubmit = async () => {
        await submitLogin(email, password)
                        .then((token) => {
                            dispatch({ type: SET_TOKEN, payload: token.data.token});
                            history.push('/dashboard');
                        });
    };
    const onRegister = async () => {
        await registerApi(email, password)
                        .then((token) => {
                            history.push('/dashboard');
                            dispatch({ type: SET_TOKEN, payload: token.data.token})
                        });
    };

    return {
        email,
        password,
        setEmail,
        setPassword,
        onSubmit,
        onRegister,
    };
};
