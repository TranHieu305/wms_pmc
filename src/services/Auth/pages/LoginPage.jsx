import FormLogin from "../components/FormLogin";

const LoginPage = () => {
    return (
        <div className="flex h-screen bg-white">
            {/* Background Login */}
            <div
                className="h-screen w-screen bg-auto bg-left bg-no-repeat"
                style={{
                    backgroundImage: `url('/images/login-background.png')`,
                }}
            >
           </div>

            {/* Login Form */}
            <div className="w-1/2 h-screen flex items-center justify-center">
                <FormLogin />
            </div>
        </div>
    )
}


export default LoginPage;