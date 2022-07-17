import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType ={
    title: string
    setTitle: (title: string)=>void
    error: boolean
    setError: (error: boolean)=>void
    callBack: ()=>void
}
export const Input = (props: InputPropsType) => {
    //функция для ввода данных
    const onChangeSetTitle = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.error) {
            props.setError(false)
        }
        props.setTitle(event.currentTarget.value)
    }

    //ввод данных по нажатию клавиш
    const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.ctrlKey) {
            props.callBack()
        }
    }
    return (
        <input
            value={props.title}
            onChange={onChangeSetTitle}     //функция для ввода данных
            onKeyDown={onKeyDownAddTask}   //функция по вводу данных по клавише ctrl+enter
            className={props.error ? 'error' : ''}
        />
    );
};

