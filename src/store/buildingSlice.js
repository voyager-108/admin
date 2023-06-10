import { createSlice } from "@reduxjs/toolkit";

const positionSlice = createSlice({
	name: 'position',
	initialState: {
		chosenBuilding : [],
		chosenSection : [],
		chosenFloor : [], 
	},
	reducers: {
		chooseBuilding(state, action) {
            state.chosenBuilding = []
			state.chosenBuilding = action.payload
		},
		chooseSection(state, action) {
            state.chosenSection = []
			state.chosenSection= action.payload
		},
		chooseFloor(state, action) {
            state.chosenFloor = []
			state.chosenFloor = action.payload
		}
	}
})

export const { chooseBuilding, chooseSection, chooseFloor } = positionSlice.actions

export default positionSlice.reducer