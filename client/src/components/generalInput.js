import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React from "react";

const GeneralInput = (props) => {
    return (
        <Grid item xs={12} sm={6}>
            <TextField
                className="input-field"
                type={props.type ? props.type : "text"}
                name={props.name}
                placeholder={props.placeholder}
                variant="outlined"
                required
                fullWidth
                onChange={props.updateFunction}
            ></TextField>
        </Grid>
    );
};
export {  GeneralInput}