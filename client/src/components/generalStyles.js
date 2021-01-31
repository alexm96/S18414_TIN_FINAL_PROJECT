import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    adTable:{
        borderCollapse:"separate",
        borderSpacing:"1em"
    }
    ,icons:{
        fill:"grey"
    },
    "search-results":{
        paddingTop:"15px"

    },
    formBackground:{
        backgroundColor:"whitesmoke",
        borderRadius:"30px",
        paddingTop:"15px",
        paddingBottom:"15px",
        width:"600px",
        marginTop:"10px"

    },
    innerForm:{
        backgroundColor:"white",
        borderRadius:"30px",
        margin:"15px 15px 15px 15px",
        textAlign:"center"
    }
}));
export default useStyles