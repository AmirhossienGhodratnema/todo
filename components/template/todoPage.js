

import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import RadioButton from "../element/radioButton";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function TodoPage() {

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('todo');

    const addHandler = async () => {
        const res = await fetch('/api/todo/create', {
            method: 'POST',
            body: JSON.stringify({ title, status }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (data.success) {
            setTitle('')
            setStatus('')
            toast.success('Create new todo');
        };
        toast.error(data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });


    }
    return (
        <div className="add-form">
            <h2>
                <GrAddCircle />
                Add New Todo
            </h2>
            <div className="add-form__input">
                <div className="add-form__input--first">
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="add-form__input--second">
                    <RadioButton
                        status={status}
                        setStatus={setStatus}
                        value='todo'
                        title='Title'
                    >
                        <BsAlignStart />
                    </RadioButton>

                    <RadioButton
                        status={status}
                        setStatus={setStatus}
                        value='inProgress'
                        title='In progress'
                    >
                        <FiSettings />
                    </RadioButton>

                    <RadioButton
                        status={status}
                        setStatus={setStatus}
                        value='review'
                        title='Review'
                    >
                        <AiOutlineFileSearch />
                    </RadioButton>

                    <RadioButton
                        status={status}
                        setStatus={setStatus}
                        value='done'
                        title='Done'
                    >
                        <MdDoneAll />
                    </RadioButton>
                </div>
                <button onClick={addHandler}>Add</button>
            </div>
            <ToastContainer />
        </div>
    )
};