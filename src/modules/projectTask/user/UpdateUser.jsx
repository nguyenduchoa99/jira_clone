import React from 'react'
import { useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../store/userReducer/userReducer'
import Swal from 'sweetalert2';
import { Layout } from 'antd';
import { logout } from '../../../store/authReducer/authReducer';
const { Header } = Layout;
const UpdateUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userDetail = JSON.parse(localStorage.getItem("userdetail"));
    const user = JSON.parse(localStorage.getItem("user"));

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        defaultValues: {
            id: userDetail.userId,
            passWord: "",
            email: "",
            name: "",
            phoneNumber: "",
        },
        mode: "onTouched",
    });

    const setInput = () => {
        setValue("name", userDetail.name);
        setValue('passWord', userDetail.passWord)
        setValue("email", userDetail.email);
        setValue("phoneNumber", userDetail.phoneNumber);
    };

    const onSubmit = async (values) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const acce = user.accessToken;
        try {
            await dispatch(updateUser(values)).unwrap();
            navigate("/user");
            Swal.fire({
                icon: 'success',
                title: 'Update User thành công'
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Update User thất bại',
                text: error
            })
        }
    };
    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth/login')
    }
    return (
        <Layout className='create-user' >
            <Header style={{ background: "white", padding: "0px", position: 'absolute', top: '0', right: 0 }}>
                {user ? (
                    <div style={{ display: 'flex' }}>
                        <div>
                            <span className='text-span-icon'>
                                <i className="fa-solid fa-user"></i>
                            </span>
                            <strong className='text-name-strong'>{user.name}</strong>
                        </div>
                        <div>
                            <button className='btn-logout' onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                ) : null}
            </Header>
            <div className='create-form-user'>
                <h1 className='text-center text-[30px] font-bold'>Create User</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='inp'>
                        <p className='text-title'>Email</p>
                        <input
                            className='create-input-user'
                            placeholder='Email'
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Email không được để trống',
                                },
                                pattern: {
                                    value:
                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Email không đúng định dạng",
                                }
                            })} />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className='inp'>
                        <p className='text-title'>Mật khẩu</p>
                        <input type="text"
                            className='create-input-user'
                            placeholder='Mật khẩu'
                            {...register('passWord', {
                                required: {
                                    value: true,
                                    message: 'Mật khẩu không được để trống',
                                },
                                minLength: {
                                    value: 6,
                                    message: "Mật khẩu phải từ 6 đến 16 ký tự",
                                },
                                maxLength: {
                                    value: 16,
                                    message: "Mật khẩu phải từ 6 đến 16 ký tự",
                                },
                            })}
                        />
                        {errors.passWord && <p className='text-red-500'>{errors.passWord.message}</p>}
                    </div>
                    <div className='inp'>
                        <p className='text-title'>Tên</p>
                        <input type='text'
                            placeholder='Tên'
                            className='create-input-user'
                            {...register('name', {
                                required: {
                                    value: true,
                                    message: 'Tên không được để trống'
                                }
                            })}
                        />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className='inp'>
                        <p className='text-title'>Số điện thoại</p>
                        <input type='text'
                            placeholder='Số điện thoại'
                            className='create-input-user'
                            {...register('phoneNumber', {
                                required: {
                                    value: true,
                                    message: 'Số điện thoại không được để trống'
                                },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Số điện thoại không đúng định dạng"
                                }
                            })}
                        />
                        {errors.phoneNumber && <p className='text-red-500'>{errors.phoneNumber.message}</p>}
                    </div>
                    {setInput()}
                    <div className='inp'>
                        <button className='create-btn-user'>Create User</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default UpdateUser