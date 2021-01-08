import React from 'react'
import loadingSvg from 'assets/img/loading.svg'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    screen: {
        dispaly: "flex",
        width: "100%",
        justifyContent: "center"
    }
});

export default function Loading(props) {
    const classes = useStyles();
    return (
        <div className={classes.screen}>
            <img width={props.width} className={classes.icon} src={loadingSvg}></img>
        </div>
    )
}
