import './ToggleMode.css';
import React, { useState, useEffect } from 'react'
import {useSelector,useDispatch } from 'react-redux';

const ToggleMode = () => {
    let switchTheme = useSelector(state => state.app.isDarkMode);
    const dispatch = useDispatch();

   
    let handChangeTheme = () => {
        dispatch({type: 'CHANGE_THEME'});
    }

    return (
        <>
            <label class="content">
	<input type="checkbox" style={{display:"none"}} checked= {switchTheme} 
        
    />
	<div class="toggle" onClick={handChangeTheme}>
		<div class="btn"
        
        >
            {
                switchTheme ? <i class="fas fa-moon"></i> : <i class="fas fa-sun"></i>
            }
        </div>
	</div>
	</label>
        </>
    )
}

export default ToggleMode
