import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type InputButtonType = {
    callBack: (title: string) => void
}


export const InputButton = (props: InputButtonType) => {
    const [title, setTitle] = useState(' ') //для временного хранения новых тасок затем передаем параметр в функцию addTask
    const [error, setError] = useState<boolean>(false)


    // вынесенная функция для баттон по добавлению таск
    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.callBack(trimmedTitle)
        } else{
            setError(true)
        }
        setTitle('')
    }

    //функция для ввода данных
    const onChangeSetTitle = (event: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false)
        }
        setTitle(event.currentTarget.value)
    }

    //ввод данных по нажатию клавиш
    const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.ctrlKey) {
            addTaskHandler()
        }
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetTitle}     //функция для ввода данных
                onKeyDown={onKeyDownAddTask}   //функция по вводу данных по клавише ctrl+enter
                className={error ? 'error' : ''}
            />
            <button onClick={addTaskHandler}>+</button>

            {error && <div style={{color: "red"}}>Title is required!</div>}
        </div>
    );
}

