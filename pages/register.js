import RegisterPage from "@/components/template/registerPage";
import { getSession } from "next-auth/react";

export default function Register() {
    return <RegisterPage />
};




export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    if (session) {
        return {
            redirect: {
                destination: '/',
                pernabebt: false
            }
        }
    }

    return {
        props: {
            session
        }
    }
}