import { BsAlignStart } from "react-icons/bs";

export default function RadioButton({ status, setStatus, value, title, children }) {
    return (
        <div className="todo">
            <lable htmlFor='todo' >{children} {title}</lable>
            <input
                type='radio'
                id={value}
                value={value}
                checked={status === value}
                onChange={(e) => setStatus(e.target.value)}
            />
        </div>
    )
};
