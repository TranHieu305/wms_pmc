import { useFormik } from "formik";
import SharedInput from "../../../shared/components/common/Input";
import validationLoginSchema from "../utils/validation";
import authApi from "../api/authApi";
import { NotificationHelper } from "../../../shared/utils/NotificationHelper";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
    const navigate = useNavigate();
    
    const initialValues = {
        email: "",
        password:""
    };
    
    const handleLogin = (values) => {
        authApi.login(values.email, values.password)
            .then((res) => {
                NotificationHelper.showSuccessNotification({description: res.message})
                setTimeout(() => navigate("/"), 1000); 
            })
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationLoginSchema,
        onSubmit: handleLogin
    });

    return (
    <div className="w-3/4 max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        
        {/* Login Form */}
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
                <SharedInput.Text 
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                    name="email"
                    onChange={formik.handleChange}
					onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && formik.errors.email}
                />
            </div>
            <div className="mb-4">
                <SharedInput.Text 
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                    name="password"
                    onChange={formik.handleChange}
					onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={formik.touched.password && formik.errors.password}
                />
            </div>
            <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
            Login
            </button>
        </form>
    </div>
    );
}
export default FormLogin;