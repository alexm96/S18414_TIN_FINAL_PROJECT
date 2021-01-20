// registration page needs email, name , lastname, location details, password
import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios"
import {GeneralInput} from "./generalInput";
import {connect} from "react-redux";
import useStyles from "./generalStyles"
import TextField from "@material-ui/core/TextField";



import MenuItem from '@material-ui/core/MenuItem';




const CreateAd = ({getJwt}) => {
    const classes = useStyles();
    const [getTitle,setTitle]=useState("")
    const [getCategory,setCategory]=useState("")
    const [getDescription,setDescription]=useState("")
    const [getImageData,setImageData]=useState(undefined)
    const [getPrice,setPrice]=useState(0.0)
    const [getPossibleCategories,setPossibleCategories]=useState([])
    const [canSubmit, setCanSubmit] = useState(true);
    const [isLoading,setLoading]=useState(false)
    const [creationResponse,setCreationResponse]=useState("")
    const serialize=()=>{
        return {
            "title":getTitle,
            "category":getCategory,
            "description":getDescription,
            "price":getPrice,
            "image":getImageData
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                '/tags',
            );

            setPossibleCategories(result.data);
        };

        fetchData();

    }, []);
   
    const createAd = async (event) => {
       event.preventDefault();
       const adToSend=serialize();
       const response = await axios.post("/advertisement",adToSend).then((data)=>{

       }).catch((error)=>{
           console.log(error)
       })
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Create a new ad
                </Typography>
                <form className={classes.form} noValidate >
                    <Grid container spacing={3}>
                        <></>
                        <Grid item xs={12} sm={12}>
                        <TextField
                            className="input-field"
                            type="text"
                            name="title"
                            placeholder="Title"
                            variant="outlined"
                            required
                            fullWidth
                            helperText={"Enter a title for your ad"}
                            onChange={(event)=>{
                                setTitle(event.target.value)
                            }}
                        ></TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="outlined-select-category"
                                select
                                label="Select"
                                value={getCategory}
                                onChange={(event)=>{
                                    console.log(event.target.value)
                                    setCategory(event.target.value)

                                }}
                                helperText="Please select your category"
                                variant="outlined"
                            >
                                {getPossibleCategories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                        <TextField
                            className="input-field"
                            type="text"
                            name="description"
                            placeholder="Some phenomenal text here"
                            variant="outlined"
                            required
                            fullWidth
                            multiline={true}
                            rows={5}
                            helperText={"Enter a short description"}
                            onChange={(event)=>{
                                setDescription(event.target.value)
                            }}
                        ></TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                className="input-field"
                                type="number"
                                name="price"
                                placeholder="A great price here (in pln)"
                                variant="outlined"
                                required
                                fullWidth
                                helperText={"Enter a price"}
                                onChange={(event)=>{
                                    setPrice(event.target.value)
                                }}
                            ></TextField>
                        </Grid>
                        <Grid item xs={12} sm={12} >
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={(event => {
                                event.preventDefault()
                                setImageData(event.target.files[0])
                            })}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="outlined" component="span" className={classes.button} >
                                Upload a picture
                            </Button>
                        </label>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!canSubmit}
                            className={classes.submit}
                            onClick={createAd}
                            aria-label={"title"}
                        >
                            Create my ad!
                        </Button>

                    </Grid>
                </form>
                <p hidden={!isLoading}> Loading </p>
                <p>{creationResponse} </p>
            </div>
        </Container>
    );
};
const mapStateToProps=(state)=>({
    getJwt:state.auth.jwt
})

export default connect(mapStateToProps)(CreateAd);


