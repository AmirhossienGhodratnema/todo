import LoginPage from "@/components/template/loginPage";
import { getSession } from "next-auth/react";


export default function Login() {
    return <LoginPage />
};


export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    console.log('Session in login', session);
    
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    };

    return {
        props: {
            session
        }
    }
}