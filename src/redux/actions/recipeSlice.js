import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { buildURL } from '../../koneksi';

// fetch Recipe

export const addRecipeAsync = createAsyncThunk('recipes/addRecipe', async (newRecipe, { getState }) => {
    try {
        const { auth } = getState(); // Mendapatkan state autentikasi dari store
        const { accessToken } = auth; // Mendapatkan token dari state autentikasi
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Menambahkan token ke header Authorization
            }
        };

        const response = await api.post(buildURL('/add_recipe'), newRecipe, config);

        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message); // Throw error with message from backend
    }
});

export const dataGlobal = async (url) => {
    const accessToken = localStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    const response = await api.get(url, config);
    return response.data.recipes; // Langsung mengembalikan data 'recipes'
  };
  

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
        successMessage: null, // Tambahkan successMessage ke dalam initialState

    },
    reducers: {
        // Menambahkan action creator untuk menambahkan Menu
        addRecipe: addRecipeAsync,
    },
    extraReducers:
        (builder) => {
            // Menangani aksi fetchStudents
            builder
                // Menangani aksi addStudentAsync
                .addCase(addRecipeAsync.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(addRecipeAsync.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.data.push(action.payload); // Menambahkan siswa baru ke array data
                    state.successMessage = action.payload.message;

                })
                .addCase(addRecipeAsync.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message; // Set error message from backend
                })
        },

});

// Ekspor action creator
export const { addRecipe } = recipeSlice.actions;

// Ekspor reducer
export default recipeSlice.reducer;


