import { SharedBtn, SharedForm, SharedInput } from "../../../shared/components/common";
import { useEffect } from "react";
import { notificationHelper } from "../../../shared/utils/notificationHelper";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { useModal } from "../../../shared/components/ModalProvider";
import { useFormik } from "formik";
import userApi from "../api/userApi";
import Enum from "../../../shared/utils/enum";
import { userCreateValidationSchema } from "../utils/validation";
import inputHelper from "../../../shared/utils/inputHelper";

function UserBtnCreate({...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        userApi.createUser(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully created user" });
                navigate(0);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot create user" });
            });
    }

    const handleClick = () => {
        showModal({
            title: "Create new user",
            body: (<FormBodyCreateUser />),
            onSave: handleSave,
        })
    }

    return <SharedBtn.BtnSave label="Add new" onClick={handleClick} {...props}/>
}

function UserBtnUpdate({user ,...props}) {
    const { showModal } = useModal(); 
    const navigate = useNavigate();

    const handleSave = (data) => {
        userApi.updateUser(data)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully updated user" });
                navigate(0);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot update user" });
            });
    }

    const handleClick = () => {
        showModal({
            title: "Update user",
            body: (<FormBodyCreateUser user={user}/>),
            onSave: handleSave,
        })
    }

    return <SharedBtn.BtnEdit onClick={handleClick} {...props}/>
}



function FormBodyCreateUser({user}) {
    const {setModalData} = useModal();
    const initialValues = {
		id: user?.id ||0,
		username: user?.username || null,
		fullName: user?.fullName || null,
        password: user?.password ||null,
        email: user?.email || null,
        phoneNumber: user?.phoneNumber ||null,
        role: Enum.UserRole.USER
	};

    const formik = useFormik({
		initialValues: initialValues,
		validationSchema: userCreateValidationSchema,
		onSubmit: (values) => {},
	});

     // Sync form data with ModalProvider
    useEffect(() => {
        setModalData(formik.values);
    }, [formik.values, setModalData]);

    const roleOptions = inputHelper.convertEnumToSelectOption(Enum.UserRole);

    return (
        <SharedForm.FormBody>
            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="username">User name*</SharedInput.Label>
                <SharedInput.Text
                        name="username"
                        placeholder="User name*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        error={formik.touched.username && formik.errors.username}
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="fullName">Full name*</SharedInput.Label>
                <SharedInput.Text
                        name="fullName"
                        placeholder="User fullname*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                        error={formik.touched.fullName && formik.errors.fullName}
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="role">Role</SharedInput.Label>
                <SharedInput.SelectInput
					name="role"
                    options={roleOptions}
                    style={{
                        width: '100%',
                    }}
                    onChange={(value) => formik.setFieldValue("role", value)}
					onBlur={formik.handleBlur}
					value={formik.values.role}
                    error={formik.touched.role && formik.errors.role}
				/>
            </SharedForm.FormBodyItem>		

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="email">Email*</SharedInput.Label>
                <SharedInput.Text
                        name="email"
                        placeholder="User email*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={formik.touched.email && formik.errors.email}
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="phoneNumber">Phone number*</SharedInput.Label>
                <SharedInput.Text
                        name="phoneNumber"
                        placeholder="User phone number*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phoneNumber}
                        error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    />
            </SharedForm.FormBodyItem>

            <SharedForm.FormBodyItem>
                <SharedInput.Label forName="password">User password*</SharedInput.Label>
                <SharedInput.TextPassword
                        name="password"
                        placeholder="User password*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={formik.touched.password && formik.errors.password}
                    />
            </SharedForm.FormBodyItem>
        </SharedForm.FormBody>
    )
}

function UserBtnDelete({user}) {
    const navigate = useNavigate();

    const onDelete = (user) => {
        userApi.deleteUser(user)
            .then((response) => {
                notificationHelper.showSuccessNotification({ description: "Successfully delete user" });
                setTimeout(() => navigate(0), 1000);
            })
            .catch((err) => {
                notificationHelper.showErrorNotification({ description: "Cannot delete user" });
            });
    }

    const openConfirmModal = () => {
        Modal.confirm({
			title: "Confirm delete",
			content: <div>Do you really want to delete user: <b>{user.fullName}</b> ?</div>,
			onOk: () => onDelete(user),
		});
    }

    return <SharedBtn.BtnDelete onClick={openConfirmModal}/>
}

export {
    UserBtnCreate,
    UserBtnDelete,
    UserBtnUpdate
}
