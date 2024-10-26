import React, { useEffect, useState } from 'react'
import InputForm from '../components/InputForm'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { addUserAsync } from '../redux/actions/authLayouts'

const FormRegister = () => {
  const dispatch = useDispatch()
  const [newUser, setNewUser] = useState({ name: '', username: '', password: '' });
  // Mengambil status dan error dari Redux
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  }

  const handleAddUser = async (e) => {
    e.preventDefault();
    // Validasi
    if (!newUser.name || !newUser.username || !newUser.password) {
      // Tampilkan pesan kesalahan jika ada data yang kosong
      Swal.fire({
        icon: 'error',
        title: 'Data Tidak Boleh Kosong',
        text: 'Mohon lengkapi semua data',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const formData = new FormData();
    formData.append('name', newUser.name);
    formData.append('username', newUser.username);
    formData.append('password', newUser.password);
    dispatch(addUserAsync(formData));
  }
  // Menggunakan useEffect untuk menampilkan pesan error jika ada
  useEffect(() => {
    if (status === 'failed' && error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mendaftar',
        text: error, // Menampilkan pesan error backend
        showConfirmButton: true,
      });
    } else if (status === 'succeeded') {
      Swal.fire({
        icon: 'success',
        title: "Data Berhasil Disimpan",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setNewUser({ name: '', username: '', password: '' });
  }, [status, error]);

  return (
    <form onSubmit={handleAddUser} className='w-full flex flex-col gap-4'>
      <InputForm
        type="text"
        name="name"
        placeholder="Enter your name"
        judulLabel="Name"
        value={newUser.name}
        onChange={handleInputChange} />
      <InputForm
        type="text"
        name="username"
        placeholder="Enter your username"
        judulLabel="Username"
        value={newUser.username}
        onChange={handleInputChange} />
      <InputForm
        type="password"
        name="password"
        placeholder="****"
        judulLabel="Password"
        value={newUser.password}
        onChange={handleInputChange} />
      <Button style="bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm mt-2" type="submit">Sign Up</Button>
      <p className='text-sm text-gray-500 mt-2 text-center'>
        Already have an account?
        <Link to="/" className='text-gray-600 font-semibold hover:text-gray-900 transition-colors'>
          {" "}Sign In
        </Link>
      </p>
    </form>
  )
}

export default FormRegister