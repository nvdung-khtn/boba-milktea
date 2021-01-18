import React, { useState, useEffect } from 'react';


import './stafforder.css';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import axiosInstance from 'services/api'
import Loading from 'components/Loading'
import FormOrder2 from 'components/FormOrder2'

import Swal from 'sweetalert2';


function StaffOrder(props) {
   

    const [menu, setMenu] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
    const [selectDrink, setSelectDrink] = useState(null);

    const [listStaffOrder, setListStaffOrder] = useState([]);
    const [totalMoney, setTotalMoney]= useState(0);
    useEffect(() => {
        axiosInstance
          .get(`/drink`)
          .then((res) => {
            const data = res.data;
            setMenu(data.content);
            setIsLoading(false);
          })
          .catch((err) => console.error(err));
    }, [])

    const hanleOpenFromDialog = (drink) => e => {
        //console.log(drink)
        setIsFormDialogOpen(true);
        setSelectDrink(drink);
        console.log("list Order", listStaffOrder);
    }

    const handleClickStaffOrder = () =>{
        Swal.fire({
            icon: 'question',
            title: 'Bạn có muốn xác nhận đơn hàng và in đơn hàng',
            showCancelButton: true,
            cancelButtonText: `Hủy`,
            confirmButtonText: `Xác nhận`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Đặt hàng thành công', '', 'success');
              setTotalMoney(0);
              setListStaffOrder([]);
            }
          })
    }

    return (
        <div className="content">
            <div className="text-center">
                <h2>Danh sách đồ uống của cửa hàng</h2>
            </div>
            {isFormDialogOpen ?
                <FormOrder2 drink={selectDrink}
                    order = {listStaffOrder}
                    isFormDialogOpen={isFormDialogOpen}
                    setIsFormDialogOpen={setIsFormDialogOpen}
                    setListStaffOrder = {setListStaffOrder}
                    totalMoney = {totalMoney}
                    setTotalMoney = {setTotalMoney}

                /> : ''
            }
            <GridContainer>
                    <GridItem xs={12} sm={8} md={8}>
                        <GridContainer>
                            {isLoading ? <Loading /> : menu.map(drink => (
                                    <GridItem key={drink.id} xs={12} sm={4} md={4}>
                                        <div className="product">
                                            <div className="cont-image">
                                                <img src={drink.image} alt={drink.name} className="img-product" />
                                            </div>
                                            <div className="text-center name-product">
                                                {drink.name}
                                            </div>
                                            <div className="text-center">
                                                <button onClick={hanleOpenFromDialog(drink)} className="button-click">ĐẶT HÀNG</button>
                                            </div>
                                        </div>
                                        
                                    </GridItem>
                            ))}
                        </GridContainer>
                        
                       
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                        <div className="cont-right">
                            <div className="text-center">
                                <p className="order-right">Đơn đặt hàng</p>
                            </div>
                            
                            {listStaffOrder.map(order => (
                                <div key={order.id} className="div-order">
                                    <span className="name-order">{order.totalName}</span>
                                    <span className="price-order">{order.totalPrice}</span>
                                </div>
                            ))}

                            {listStaffOrder.length === 0 ? 
                                ''
                            :
                            <hr></hr>
                            }
                            
                                <>
                                <div className="div-order">
                                    <span className="name-total">Tổng cộng: </span>
                                    <span className="price-total">{totalMoney}</span>
                                </div>
                                 <button 
                                 disabled={listStaffOrder.length === 0}
                                 className="button-click" 
                                 onClick={handleClickStaffOrder}>XÁC NHẬN ĐẶT HÀNG</button>
                                </>
                         </div>
                    </GridItem>
            </GridContainer>
            
            
        </div>
    );
}

export default StaffOrder;