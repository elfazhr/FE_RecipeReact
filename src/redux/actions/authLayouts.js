import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { buildURL } from '../../koneksi';
import { jwtDecode } from 'jwt-decode';

// Membuat async thunk untuk login
export const loginAsync = createAsyncThunk('auth/login', async (formData) => {
    try {
        const response = await api.post(buildURL('/login'), formData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // Ambil token dari respons
        const { token } = response.data;

        // Simpan token ke local storage
        localStorage.setItem('accessToken', token);

        // Dekode token untuk mendapatkan user_id
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id; // Ambil user_id dari payload

        // Simpan user_id ke local storage
        localStorage.setItem('user_id', userId);

        // Kembalikan userId untuk disimpan di Redux
        return { token, userId }; // Mengembalikan token dan userId
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});



export const addUserAsync = createAsyncThunk('auth/addUser', async (newUser, { rejectWithValue }) => {
    try {
        const response = await api.post(buildURL('/register'), newUser);
        return response.data;
    } catch (error) {
        // Tangkap pesan error dari respons backend jika ada
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.message); // Menggunakan pesan error dari backend
        } else {
            return rejectWithValue('Terjadi kesalahan yang tidak diketahui');
        }
    }
});

export const updateProfileAsync = createAsyncThunk('auth/updateProfile', async ({_id, updatedData}, {getState}) => {
    try {
        const { auth } = getState(); // Mendapatkan state autentikasi dari store
        const { accessToken } = auth; // Mendapatkan token dari state autentikasi
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Menambahkan token ke header Authorization
            }
        };
        const response = await api.put(buildURL('/update_profile'), updatedData, config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message); // Throw error with message from backend
    }
});

export const dataUser = async (url) => {
    const accessToken = localStorage.getItem('accessToken');
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const response = await api.get(url, config);
    return response.data.user; // Langsung mengembalikan data 'recipes'
};



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
        accessToken: localStorage.getItem('accessToken'),
    },
    reducers: {
        logout(state) {
            state.data = null;
            state.accessToken = null;
            localStorage.removeItem('userData'); // Hapus dari localStorage
            localStorage.removeItem('accessToken'); // Hapus token dari localStorage
        },
    },
    extraReducers:
        (builder) => {
            builder
                .addCase(loginAsync.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(loginAsync.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.data = action.payload;

                })
                .addCase(loginAsync.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                })
                // Menangani aksi addStudentAsync
                .addCase(addUserAsync.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(addUserAsync.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.data.push(action.payload);
                })
                .addCase(addUserAsync.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                })
                .addCase(updateProfileAsync.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(updateProfileAsync.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    // Update data siswa dengan data yang baru
                    state.data = state.data.map((profile) =>
                        profile._id === action.payload.data._id ? action.payload : profile
                    );
                    
                })
                .addCase(updateProfileAsync.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                });
        },

});
export const { logout } = authSlice.actions; // Ekspor action logout
// Ekspor reducer
export default authSlice.reducer;
