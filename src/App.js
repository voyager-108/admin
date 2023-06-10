import React, { useRef, useEffect, useState } from "react";
import MapComponent from "./components/Map/MapComponent";
import UltimateFilter from "./components/Body/UltimateFilter";
import SearchBar from "./components/Top/SearchBar"
import { useSelector, useDispatch } from 'react-redux';
import Download from './components/Map/Download'
import { Grid, createTheme, Container, ThemeProvider, CssBaseline, Divider } from '@mui/material';
import { chooseProject, fetchProjects } from "./store/projectSlice";


function App() {

  const dispatch = useDispatch()

  const theme = createTheme({
	palette: {
		type: 'light',
		primary: {
		  main: '#3f51b5',
		},
		secondary: {
		  main: '#f52e47',
		},
		background: {
		  default: '#f9f9f9',
		  paper: '#ffffff',
		},
	  }
  })

  useEffect(() => {
	fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
   .then(response => response.json())
   .then(data => console.log(data));
    // getAllUsers()
    //   .then(projects => {
	// 	dispatch(fetchProjects(projects))
    //   });
  }, [])

  return (
	<ThemeProvider className="App"  id="App" theme={theme}>
		<CssBaseline/>
		<Container  id='containerId' maxWidth={'xl'}>
		<Grid container padding={2} spacing={5}>
			
						<Grid item xs={12} >
								<SearchBar/>
						</Grid>
	
						
						<Grid item xs={5}>
									<UltimateFilter/>
						</Grid>

						<Grid item xs={7}>
							<Grid container padding={0} spacing={1}>

								<Grid item xs={12}>
									<MapComponent/>
								</Grid>

								<Grid item xs={12}>
									<Download/>
								</Grid>

							</Grid>
						</Grid>
						
			</Grid>

		</Container>
	</ThemeProvider>
  );
}

export default App
