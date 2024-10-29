import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { buildURL } from '../../koneksi';

// Membuat async thunk untuk login
export const loginAsync = createAsyncThunk('auth/login', async (formData) => {
    try {
      const response = await api.post(buildURL('/login'), formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      return response.data;
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


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
        accessToken: localStorage.getItem('accessToken'),
    },
    reducers: {
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
                    state.user = action.payload; // Assuming the user info is returned here
                    // Menyimpan access access_token ke local storage
                    localStorage.setItem('accessToken', action.payload.token);
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
        },

});

// Ekspor reducer
export default authSlice.reducer;
