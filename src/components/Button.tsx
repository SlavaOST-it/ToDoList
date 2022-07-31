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

    const finishClassName = `${props.className} ${s.button}`
    return (
        <button className={finishClassName} onClick={onClickHandler}>{props.name}</button>
    );
}