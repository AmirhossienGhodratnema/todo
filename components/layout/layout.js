import Link from "next/link";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";


export default function Layout({ children }) {

    const logOutHandler = () => { }
    return (
        <div className="container">
            <header>
                <p>Botostart Todo App</p>
                <button onClick={logOutHandler}>
                    Logout
                    <FiLogOut />
                </button>
            </header>
            <div className="container--main">
                <aside>
                    <p>Welcome 👋</p>
                    <ul>
                        <li>
                            <VscListSelection />
                            <Link href="/">Todos</Link>
                        </li>
                        <li>
                            <BiMessageSquareAdd />
                            <Link href="/addTodo">Add Todo</Link>
                        </li>
                        <li>
                            <RxDashboard />
                            <Link href="/profile">Profile</Link>
                        </li>
                    </ul>
                </aside>
                <section>{children}</section>
            </div>
        </div>
    )
};
