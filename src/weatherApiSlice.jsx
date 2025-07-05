import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeather = createAsyncThunk(
	"weatherApi/fetchWeather",
	async () => {
		const response = await axios.get(
			"https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=118fc1685b19651454cd67307200e2f7"
		);
		console.log(response);

		// handle success
		const responseTemp = Math.round(response.data.main.temp - 272.15);
		const min = Math.round(response.data.main.temp_min - 272.15);
		const max = Math.round(response.data.main.temp_max - 272.15);
		const description = response.data.weather[0].description;
		const responseIcon = response.data.weather[0].icon;

		return {
			number: responseTemp,
			min,
			max,
			description,
			icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
		};
		
	}
);
const weatherApiSlice = createSlice({
	name: "weatherApi",

	initialState: {
		result: "empty",
		weather: {},
		isLoading: false,
	},

	reducers: {
		changeResult: (state, action) => {
			state.result = "changed";
		},
	},

	extraReducers(builder) {
		builder
			.addCase(fetchWeather.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchWeather.fulfilled, (state, action) => {
				state.isLoading = false;

				state.weather = action.payload;
			})
			.addCase(fetchWeather.rejected, (state, action) => {
				state.isLoading = false;
			});
	},
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
