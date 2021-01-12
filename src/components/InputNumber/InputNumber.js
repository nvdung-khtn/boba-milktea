import React, { useEffect, useState } from 'react'
import './InputNumber.css'
import { createAction } from '@reduxjs/toolkit'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const InputNumber = ({ input, handleInputChange }) => {


    const handleChange = (e) => {
        handleInputChange(e.target.value);
    }

    const sub = () => {
        handleInputChange(input > 1 ? input - 1 : input);
    }
    const plus = () => {
        handleInputChange(input + 1);
    }

    return (
        <div className='input-number-container'>
            <div className='input-number-layout'>
                <div className="plus-sub" onClick={sub} > < RemoveIcon /> </div>
                <input
                    className='input-number'
                    type="number"
                    onChange={handleChange}
                    value={input}
                />

                <div className="plus-sub" onClick={plus} > <AddIcon /> </div>
            </div>
        </div>
    );
};

export default (InputNumber);