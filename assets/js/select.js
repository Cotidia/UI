"use strict"
import React, { Component } from 'react'
import { formHandler, Select } from './src'
class SelectDemo extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: {
                fruit: null
            }
        }
        this.updateValue = formHandler.updateValue.bind(this)
    }
    render(){
        return (<div>
            <Select
                name="fruit"
                label="Choose a fruit"
                value={ this.state.data.fruit }
                updateValue={ this.updateValue }
                options={ this._getOptions() }/>
            <code>
                { JSON.stringify(this.state.data, null, 4) }
            </code>
        </div>)
    }
    _getOptions(){
        return [
            {
                label: "Apple",
                value: "apple"
            },
            {
                label: "Pear",
                value: "pear"
            },
            {
                label: "Cherry",
                value: "cherry"
            },
            {
                label: "Mango",
                value: "mango"
            },
            {
                label: "Grape",
                value: "grape"
            }
        ]
    }
}
module.exports = SelectDemo
