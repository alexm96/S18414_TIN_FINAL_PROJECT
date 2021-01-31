// registration page needs email, name , lastname, location details, password
import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios"
import {connect} from "react-redux";
import useStyles from "./generalStyles"
import TextField from "@material-ui/core/TextField";
import "../../src/i18n/i18n"
import {useTranslation} from "react-i18next";

import MenuItem from '@material-ui/core/MenuItem';




const CreateAd = ({getJwt,history}) => {
    const {t}=useTranslation()
    const classes = useStyles();
    const [getTitle,setTitle]=useState("")
    const [getCategory,setCategory]=useState("14")
    const [getDescription,setDescription]=useState("")
    const [getImageData,setImageData]=useState(undefined)
    const [getPrice,setPrice]=useState(0.0)
    const [getPossibleCategories,setPossibleCategories]=useState([{"id":"14","name":"Other"}]) // default value
    const [canSubmit, setCanSubmit] = useState(false);
    const [isLoading,setLoading]=useState(false)
    const [creationResponse,setCreationResponse]=useState("")
    const serialize=()=>{
        let formData = new FormData()
        formData.append('title', getTitle)
        formData.append('category', getCategory)
        formData.append('description', getDescription)
        formData.append('price', getPrice.toString())
        formData.append('image', getImageData, getImageData.name)
        return formData
    }
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                '/tags',
            );

            setPossibleCategories(result.data)

        };
        fetchData();


    }, []);
   useEffect(()=>{
       const readAndRedirect=()=>{
           history.push("/")
       }
        console.log("Creation"+creationResponse.status)
       if(creationResponse && creationResponse.status===200){
           console.log("here")
           setTimeout(readAndRedirect,1000)
       }
   },[creationResponse])
    const createAd = async (event) => {
       event.preventDefault();
       const adToSend=serialize();
       setLoading(true)
       axios.post("/post",adToSend,{headers:{'Accept': 'application/json',"jwt":getJwt}}).then((response)=>{
           setCreationResponse(response)
       }).catch((error)=>{
           setCreationResponse(error)
       }).finally(()=>{
           setLoading(false)
       })
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {t("createAd.heading")}
                </Typography>
                <form className={classes.form} noValidate >
                    <Grid container spacing={3}>
                        <></>
                        <Grid item xs={12} sm={12}>
                        <TextField
                            className="input-field"
                            type="text"
                            name="title"
                            placeholder={t("createAd.title")}
                            variant="outlined"
                            required
                            fullWidth
                            helperText={t("createAd.titleHelp")}
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
                                    setCategory(event.target.value)


                                }}
                                helperText={t("createAd.categoryHelp")}
                                variant="outlined"
                            >
                                {getPossibleCategories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>

                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                        <TextField
                            className="input-field"
                            type="text"
                            name="description"
                            placeholder={t("createAd.description")}
                            variant="outlined"
                            required
                            fullWidth
                            multiline={true}
                            rows={5}
                            helperText={t("createAd.descriptionHelp")}
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
                                placeholder={t("createAd.price")}
                                variant="outlined"
                                required
                                fullWidth
                                helperText={t("createAd.priceHelp")}
                                onChange={(event)=>{
                                    setPrice(event.target.value)
                                }}
                            ></TextField>
                        </Grid>
                        <Grid item xs={6} sm={6} >
                        <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            onChange={ ( async event => {
                                event.preventDefault()
                                setImageData(event.target.files[0])
                                setCanSubmit(true)
                            })}

                        />
                        <label htmlFor="raised-button-file">
                            <Button  variant="outlined" component="span" className={classes.button} >
                                {t("createAd.upload")}
                            </Button>
                        </label>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <Typography component="p" >
                                {getImageData ? getImageData.name : t("createAd.uploadHelp")}
                            </Typography>
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
                            {!canSubmit?t("createAd.uploadBlock"):t("createAd.createButton")}
                        </Button>

                    </Grid>
                </form>
                <p hidden={!isLoading}> Loading </p>
                <p>{creationResponse===""?"":creationResponse.data["message"]} </p>
            </div>
        </Container>
    );
};
const mapStateToProps=(state)=>({
    getJwt:state.auth.jwt
})

export default connect(mapStateToProps)(CreateAd);


