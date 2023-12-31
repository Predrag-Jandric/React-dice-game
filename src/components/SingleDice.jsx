import React from "react"

export default function SingleDice(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <h1>{props.value}</h1>
        </div>
    )
}