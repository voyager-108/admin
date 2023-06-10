import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
	name: 'project',
	initialState: {
		allProjects : [],
		chosenProject : [],
	},
	reducers: {
		fetchProjects(state, action) {
			state.allProjects = []
			state.allProjects = action.payload
		},
		chooseProject(state, action) {
            state.chosenProject = []
			state.chosenProject = action.payload
		}
	}
})

export const { chooseProject, fetchProjects } = projectSlice.actions

export default projectSlice.reducer