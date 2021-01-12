import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InputNumber from 'components/InputNumber/InputNumber'
//
import axiosInstance from 'services/api'
import { addCartItem } from 'services/cartHelper'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    center: {
        display: "flex",
        justifyContent: "center",
        marginTop: "15px"
    },
    avatar: {
        display: "flex",
        justifyContent: "center",
        width: "150px",
        height: "150px",
    },
    title: {
        display: "flex",
        justifyContent: "center",
    },
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export default function FormDialog({ drink, isFormDialogOpen, setIsFormDialogOpen }) {
    const [toppings, setToppings] = useState([])
    const classes = useStyles();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(null)
    const [topping, setTopping] = useState(null);
    const [note, setNote] = useState(null)
    const handleClose = () => {
        setIsFormDialogOpen(false);
    };

    useEffect(() => {
        axiosInstance
            .get('/topping').then(res => {
                if (res.data) {
                    setToppings(res.data.content)
                    console.log(res.data)
                }

            })
        if (drink) setSize(drink.priceList[0]);
    }, [isFormDialogOpen])

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    }
    const handleToppingChange = (e) => {
        setTopping(e.target.value);
    }

    const handleNoteChange = (e) => {
        setNote(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addCartItem({
            drinkName: drink.name,
            drinkPriceId: size,
            quantity,
            note,
            toppingId: topping
        }, () => {
            handleClose();
        })
    }


    return (
        <>
            <Dialog open={isFormDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle className={classes.title} id="form-dialog-title">  {drink.name}</DialogTitle>
                <DialogContent>
                    <Container component="main" maxWidth="sm">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <img className={classes.avatar} src={drink.image} />
                            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                <GridContainer>
                                    <GridItem xs={12} sm={6} md={6}>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <TextField
                                                id="outlined-select-currency-native"
                                                select
                                                label="Chọn size"
                                                value={size}
                                                onChange={handleSizeChange}
                                                variant="outlined"
                                            >
                                                {drink.priceList.map((item) => (
                                                    <option key={item.id} value={item}>
                                                        {item.size} - {item.price} đ
                                                    </option>
                                                ))}
                                            </TextField>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={6} md={6}>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <TextField
                                                id="outlined-select-currency-native"
                                                select
                                                label="Chọn Topping"
                                                value={topping}
                                                onChange={handleToppingChange}
                                                variant="outlined"

                                            >
                                                <option key={0} value={null}>
                                                    Không
                                            </option>
                                                {toppings.map((topping) => (
                                                    <option key={topping.id} value={topping}>
                                                        {topping.name} -  {topping.price} đ
                                                    </option>
                                                ))}
                                            </TextField>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <TextField
                                                id="outlined-helperText"
                                                label="Ghi chú"
                                                value={note}
                                                onChange={handleNoteChange}
                                                variant="outlined"
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <FormControl variant="fill</FormControl>ed" className={classes.formControl}>
                                            <InputNumber handleInputChange={setQuantity} input={quantity} />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <div className={classes.center} >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Thêm vào giỏ hàng
                                     </Button>
                                        </div>
                                    </GridItem>
                                </GridContainer>

                            </form>
                        </div>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
}