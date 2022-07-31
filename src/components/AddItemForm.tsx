import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";
import "../App.css"

type AddItemFormType = {
   addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormType> = ({addItem}) => {


    const [title, setTitle] = useState("") //для временного хранения новых тасок затем передаем параметр в функцию addTask
    const [error, setError] = useState<boolean>(false)


    const onChangeSetTitle = (event: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
        }
        setTitle(event.currentTarget.value)
    }

    //ввод данных по нажатию клавиш
    const onKeyDownAddItem = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.ctrlKey) {
            OnClickAddItemHandler()
        }
    }

    // вынесенная функция для баттон по добавлению таск
    const OnClickAddItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetTitle}     //функция для ввода данных
                onKeyDown={onKeyDownAddItem}   //функция по вводу данных по клавише ctrl+enter
                className={error ? 'error' : ''}
            />

            <Button name={'+'} className={''} callBack={OnClickAddItemHandler}/>
            {error && <div style={{color: "red"}}>Title is required!</div>}

        </div>
    );
};

