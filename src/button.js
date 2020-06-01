import React from "react"

function Button(props){
    return(
        
        <button width={props.width} className={props.className}  id={props.id} value={props.value} onClick={props.handleNumber}>{props.value}</button>
        

    )
}

export default Button