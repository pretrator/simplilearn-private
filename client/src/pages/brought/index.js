const { createUseStyles } = require("react-jss");
const { useBought } = require('./useBought')
const { Affix, Divider } = require('antd');
const useStyles = createUseStyles({
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
    divider: {
        margin: '0px',
        marginBottom: '3em'
    },
    subtitle: {
        margin: '1em',
        fontSize: '20px',
        fontWeight: 400,
        marginBottom: '16px',
    },
    courseTitle: {
        fontSize: '16px',
        fontWeight: 200,
    },
    courseCard: {
        width: '80%',
        flexDirection: 'column',
    },
    cardContainer: {
        overflow: 'scroll',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
    },
    topBar:{
        display: 'flex',
        justifyContent: 'space-between',
    },
    noData: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const Brought = () => {
    const classes = useStyles();
    const { bought } = useBought();
    return <div className={classes.baseBought}>
        <Affix>
            <div className={classes.navBar}>
                <span className={classes.title}>Bought Courses</span>
            </div>
            <Divider className={classes.divider}/>
        </Affix>
        <span className={classes.subtitle}>Bought Course List</span>
        <div className={classes.cardContainer}>
            {bought.length === 0 ? bought.map(item => {
                return <div key={item.id} className={classes.courseCard}>
                    <div className={classes.topBar}>
                        <span className={classes.title}>{item.title}</span>
                        <span className={classes.title}>{'Id:- ' + item.id}</span>
                    </div>
                    <div>
                        {item.videoLink.map((video, j) => {
                            const subString = video.substring(16);
                            const videoURL = 'https://www.youtube.com/embed/' + subString;
                            return <iframe height={'500px'} width={'100%'} src={videoURL} title={j}></iframe>
                        })}
                    <Divider className={classes.divider}/>
                    </div>
                </div>;
            }): <div className={classes.noData}>
                    No Course Bought Till Now
                </div>}
        </div>
    </div>;
}
export default Brought;
