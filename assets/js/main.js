import React from 'react'
import { render } from 'react-dom'
import SelectDemo from './select'

if(document.getElementById('select')){
    render(
        <SelectDemo/>,
        document.getElementById('select')
    )
}
