import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import classNames from "classnames";
import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import stylesLayout from "assets/jss/material-kit-react/views/landingPage.js";
import axiosInstanceToken from 'services/apiToken'
import { formatTime } from 'services/utils'
import Loading from 'components/Loading'
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const useStyles = makeStyles(styles);
const useStylesLayout = makeStyles(stylesLayout);

function createData(date, total, detail) {
    return {
        date,
        total,
        detail
    };
}

function Row({ row }) {

    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            {console.log(row)}
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.date}
                </TableCell>
                <TableCell align="right">{row.total}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Chi tiết đơn hàng
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tên món</TableCell>
                                        <TableCell>Size</TableCell>
                                        <TableCell>Giá</TableCell>
                                        <TableCell >Số lượng</TableCell>
                                        <TableCell>Topping</TableCell>
                                        <TableCell align="right">Thành tiền (VND)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row ? row.detail.map((historyRow) => (
                                        <TableRow key={historyRow.name}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.name}
                                            </TableCell>
                                            <TableCell>{historyRow.size}</TableCell>
                                            <TableCell >{historyRow.price}</TableCell>
                                            <TableCell >{historyRow.quantity}</TableCell>
                                            <TableCell >{`${historyRow.topping} (${historyRow.toppingPrice} đ)`}</TableCell>
                                            <TableCell align="right">
                                                {Math.round((historyRow.price * historyRow.quantity + historyRow.toppingPrice) * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    )) : ''}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


// const rows = [
//     createData('20/11/2020', 1000000, [{
//         name: "Trà sữa trân châu đường đen",
//         size: "S",
//         price: 30000,
//         quantity: 2,
//         topping: "Trân châu",
//         subtotal: 60000
//     }]),
// ];

export default function CollapsibleTable() {
    const classes = useStyles();
    const classesLayout = useStylesLayout();
    const [historyPurchase, setHistoryPurchase] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const createRowsData = (data) => {
        let rows = [];
        data.forEach(order => {
            rows.push(createData(formatTime(order.creationDate),
                order.cost,
                getDetailList(order.orderDetailList)))
        });
        setHistoryPurchase(rows)
    }

    const getDetailList = (orderDetailList) => {
        let list = [];
        orderDetailList.forEach(detail => {
            list.push({
                name: detail.drinkName,
                size: detail.drinkPrice.size,
                price: detail.drinkPrice.price,
                quantity: detail.quantity,
                topping: detail.topping.name,
                toppingPrice: detail.topping.price
            })
        });
        return list;
    }

    useEffect(() => {
        axiosInstanceToken
            .get('order/history')
            .then(async res => {
                console.log(res.data)
                createRowsData(res.data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    return (
        <div className={classNames(classesLayout.main, classesLayout.mainRaised)}>
            {console.log(historyPurchase)}
            <div className={classesLayout.container}>
                <div className={classes.section}>
                    <h2 className={classes.title}>Lịch sử đặt hàng</h2>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ngày đặt hàng </TableCell>
                                    <TableCell align="right">Tổng thanh toán&nbsp;(VNĐ)</TableCell>
                                </TableRow>
                            </TableHead>

                            {isLoading ? <Loading />
                                :
                                <TableBody>
                                    {historyPurchase.map((row) => (
                                        <Row key={row.date} row={row} />
                                    ))}
                                </TableBody>
                            }
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}