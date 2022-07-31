import React from "react";
import s from "./Button.module.css"


type ButtonType = {
    name: string,
    callBack: () => void
    className: string
}


export const Button = (props: ButtonType) => {
    const onClickHandler = () => {
        props.callBack()
    }

    const finishClassName = `${s.button} ${props.className}`
    return (
        <button className={finishClassName} onClick={onClickHandler}>{props.name}</button>
    );
}