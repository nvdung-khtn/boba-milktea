import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import classNames from "classnames";
import stylesLayout from "assets/jss/material-kit-react/views/landingPage.js";
import styleLayoutContent from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import { getCart, getCartLength, getTotalPrice, getOrderBodyFromCart, emptyCart } from 'services/cartHelper';
import Button from '@material-ui/core/Button';
import Snackbar from 'components/Snackbar'
import Loading from 'components/Loading'

import axiosInstanceToken from "services/apiToken"

const TAX_RATE = 0.07;

const useStyles = makeStyles({
    table: {
        minWidth: 700,
        marginBottom: "20px"
    },
    button: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 10,
        marginRight: 10
    }
});


const invoiceSubtotal = 11;
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;
const useStylesLayout = makeStyles(stylesLayout);
const useStylesLayoutContent = makeStyles(styleLayoutContent);
export default function CartPage() {
    const classes = useStyles();
    const classesLayoutContent = useStylesLayoutContent();
    const classesLayout = useStylesLayout();
    const [cart, setCart] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        console.log(getCart())
        setCart(getCart());
    }, [])

    const hanleOrder = () => {
        setIsLoading(true);
        axiosInstanceToken
            .post('order', getOrderBodyFromCart())
            .then(res => {
                emptyCart(() => {
                    setTimeout(() => {
                        setOrderSuccess(true);
                        setCart([]);
                        setIsLoading(false);
                    }, 3000);
                })
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

    return (
        <div className={classNames(classesLayout.main, classesLayout.mainRaised)}>
            <div className={classesLayout.container}>
                <div className={classesLayoutContent.section}>
                    <h2 className={classesLayoutContent.title}>Giỏ hàng của bạn</h2>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell ></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell ></TableCell>
                                    <TableCell ></TableCell>
                                    <TableCell align="right">Số lượng: {getCartLength()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tên món</TableCell>
                                    <TableCell >Size</TableCell>
                                    <TableCell>Số lượng</TableCell>
                                    <TableCell >Topping</TableCell>
                                    <TableCell>Ghi chú</TableCell>
                                    <TableCell align="right">Thành tiền</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.length > 0 ? cart.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{row.drinkName}</TableCell>
                                        <TableCell >{`${row.drinkPriceId.size} - ${row.drinkPriceId.price} đ`}</TableCell>
                                        <TableCell>{row.quantity}</TableCell>
                                        <TableCell>{row.toppingId ? `${row.toppingId.name} - ${row.toppingId.price} đ` : ''}</TableCell>
                                        <TableCell >{row.note}</TableCell>
                                        <TableCell align="right">{row.quantity * row.drinkPriceId.price
                                            + (row.toppingId ? row.toppingId.price : 0)} đ</TableCell>
                                    </TableRow>
                                )) : ''}

                                <TableRow>
                                    <TableCell rowSpan={6} />
                                    <TableCell colSpan={4}>Tổng tiền</TableCell>
                                    <TableCell align="right">{getTotalPrice()} đ</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div className={classes.button}>
                            {isLoading ? <Loading width="50px" /> : ''}
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={cart.length === 0 || isLoading}
                                onClick={hanleOrder}>
                                Đặt hàng
                            </Button>
                        </div>
                    </TableContainer> {orderSuccess ? <Snackbar message="Đặt hàng thành công" />
                        : ''
                    }
                </div>
            </div>
        </div >
    );
}