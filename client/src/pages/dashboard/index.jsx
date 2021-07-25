import { Affix, Divider, Card, Button } from "antd";
import { createUseStyles } from "react-jss";
import { useDashboard } from './useDashboard';
import PaymentModal from './paymentModal';
import { useState } from "react";
import { useHistory } from "react-router-dom";

const { Meta } = Card;
const useStyles = createUseStyles({
    dashboardBase: {

    },
    navBar: {
        backgroundColor: 'white',
        height: '50px',
        width: '100%',
        alignItems: 'center',
        display: 'flex',
        padding: '1em',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
    },
    broughtCourse: {
        fontSize: 20,
        fontWeight: '400',
    },
    divider: {
        margin: '0px',
    },
    cardContainer:{
        margin: '1.5em',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    subtitle: {
        margin: '1em',
        fontSize: '20px',
        fontWeight: 400
    },
    buyButton: {
        width: '100%',
        borderRadius: '4px',
        marginTop: '16px',
    }
});
const Dashboard = (props) => {
    const classes = useStyles();
    const [ visible, setVisible ] = useState(false);
    const { items } = useDashboard();
    const history = useHistory();
    const [currentCourse, setCurrentCourse] = useState('');
    return <div className={classes.dashboardBase}>
        <PaymentModal visible={visible} setVisible={setVisible} courseId={currentCourse}/>
        <Affix>
            <div className={classes.navBar}>
                <span className={classes.title}>Simplilearn Courses Dashboard</span>
                <span onClick={() => history.push('/brought')} 
                      className={classes.broughtCourse}>
                        <a>View Brought Course</a>
                </span>
            </div>
            <Divider className={classes.divider}/>
        </Affix>
            <div className={classes.subtitle}>Course List</div>
            <div className={classes.cardContainer}>
                {console.log(items)}
                {items.map(item => {
                    return <Card
                    key={item.id}
                    hoverable
                    style={{ 
                        height: '300px', 
                        width: 240, 
                        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                        margin: '2em' }}
                    cover={<img width='240px' height='160px' alt="example" src={item.thumbnailURL} />}
                  >
                    <Meta title={item.title} description={'₹' + item.price} />
                    <Button onClick={() => {
                        setCurrentCourse(item.id);
                        setVisible(true)}} className={classes.buyButton}>Buy Now</Button>
                  </Card>;
                })}
            </div>
    </div>;
}
export default Dashboard;