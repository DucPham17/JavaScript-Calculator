import React from "react"

function Button(props){
    return(
        <div>
        <button id={props.id} value={props.value} onClick={props.handleNumber}>{props.value}</button>
        </div>

    )
}

export default Button