import { createUseStyles } from "react-jss";
import { DatePicker, Input, message, Modal } from 'antd';
import OtpInput from 'react-otp-input';
import { useEffect, useState } from "react";
import { buyCourse } from './../../api/auth';
import { useHistory } from "react-router-dom";

const useStyles = createUseStyles({
    cardNumber: {
        width: '100%',
        marginTop: '20px',
        marginBottom: '16px',
    },
    bodyContainer: {
        display: 'flex',
    },
    cvv: {
        flex: 1,
    },
    otp:{
        height: '200px',
        width: '200px',
        justifyContent:'space-around'
    }
});

const PaymentModal = (props) => {
    const {visible, setVisible, courseId} = props;
    const [showOtp, setShowOTP] = useState(false);
    const [otp, setOtp] = useState('');
    const classes = useStyles();
    const history = useHistory();
    const validateotp = () => {
        if(otp === '123456'){
            message.success("OTP Correct");
            message.loading({ key: 'buying', content: "Buying in Progress"});
            buyCourse(courseId).then(() => {
                message.success({key:'buying', content:'Buy SuccessFull'});
                history.push('/brought')
            })
                                .catch(() => message.error({key: 'buying', content:'Buy Failed'}));
        }
    }
    useEffect(() => validateotp(),[otp]);

    return <Modal visible={visible} okText={otp ? 'Validate OTP':'Pay'} onOk={() => setShowOTP(true)} onCancel={() => setVisible(false)}>
        {showOtp ? <OtpInput
        value={otp}
        inputStyle={{height:'50px', width:'40px'}}
        onChange={setOtp}
        className={classes.otp}
        numInputs={6}
        separator={<span>-</span>}
      />
: <><Input className={classes.cardNumber} placeholder="Card Number"/>
        <div className={classes.bodyContainer}>
            <DatePicker picker="month" style={{flex: 4}}/>
            <Input className={classes.cvv} placeholder="CVV"/>
        </div></>  }
    </Modal>
}

export default PaymentModal;
