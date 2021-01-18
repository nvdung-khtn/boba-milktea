import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CssBaseline from '@material-ui/core/CssBaseline';

import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InputNumber from 'components/InputNumber/InputNumber'
//
import axiosInstance from 'services/api'

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
    button: {
        marginBottom: "15px",
        padding: "10px 60px"
    }
}));

export default function FormDialog({ drink, order, isFormDialogOpen, setIsFormDialogOpen, setListStaffOrder, totalMoney, setTotalMoney }) {
    const [toppings, setToppings] = useState([])
    const classes = useStyles();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(null)
    const [topping, setTopping] = useState(null);
    const handleClose = (order1) => {
        setIsFormDialogOpen(false);
        // console.log(order);
        const newMoney = totalMoney + order1.totalPrice;
        const newdata = order.concat(order1);
        setListStaffOrder(newdata);
        setTotalMoney(newMoney);
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


    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.removeItem('orderstaff');

        let nameTopping;
        let toppingPrice;
        let totalName;
        if(topping === null ){
            nameTopping = '';
            toppingPrice = 0;
            totalName = drink.name + '(size ' + size.size + ') x ' + quantity; 

        }else {
            nameTopping = topping.name;
            toppingPrice = topping.price;
            totalName = drink.name + '(size ' + size.size + ') x ' + quantity + ' + ' + nameTopping; 
        }
        const total = quantity * size.price + quantity * toppingPrice;
        const order = {
            id: Date.now(),
            totalName: totalName,
            totalPrice: total
        }
        handleClose(order);
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
                                                className={classes.button}
                                            >
                                                ĐƠN ĐẶT HÀNG
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