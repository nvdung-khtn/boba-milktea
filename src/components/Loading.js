import React from 'react'
import loadingSvg from 'assets/img/loading.svg'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    screen: {
        display: "flex !important",
        width: "100% !important",
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
