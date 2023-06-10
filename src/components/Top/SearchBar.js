import React, { useRef, useEffect, useState } from "react";
import { Box, Grid, Autocomplete, TextField } from '@mui/material';
import { ReactComponent as Text }from '../../assets/logo.svg';
import {  useSelector, useDispatch } from 'react-redux';
import customData from '../../data/administrative'
import { chooseDistricts } from '../../store/districtsSlice';
import {AnimatePresence, motion} from "framer-motion/dist/framer-motion"; 
import { chooseProject } from "../../store/projectSlice";


export default function BasicCard() {
	const [value, setValue] = React.useState('');
	const [inputValue, setInputValue] = React.useState('');
	const [customChangedData, setCustomChangedData] = React.useState(customData)
	const dispatch = useDispatch()
	const chosenOption = useSelector((state) => state.map.option)

	const handleChange = (event) => {
			// if length is one, we need to understand 
			// wether it's a district or administrative district
			// providing a new list of districts to pick from 
			console.log(event)
			const foundItem = customChangedData.find((item) => {
				return event[0].name === item.name
			})
			setCustomChangedData(foundItem)
			dispatch(chooseProject(event))
	  };

  return (
	<Box sx={{ border: 0,  m: 0}} >
			<Grid item xs={12}>
				<Grid container padding={0} spacing={1.5}>
					<Grid item xs={12}>
						<motion.div
						initial={{y: 0, opacity: 1}}
						animate={{y: 0, opacity: 1}}
						>
						<Autocomplete
						multiple
						sx={{ 
							mt: 12,
							zIndex: 'tooltip',
							border: 0,
							borderRadius: 3,
							borderColor: '#000000',
							"& input::placeholder": {
								fontSize: "25px"
								}
							}}
						limitTags={3}
						options={customChangedData}
						onInputChange={(event, newInputValue) => {
							setInputValue(newInputValue);
						}}
						onChange={(event, newValue) => {
							setValue(newValue);
							console.log('thisnew')
							handleChange(newValue);
						}}
						getOptionLabel={(option) => option.name}
						renderInput={(params) => (
							<TextField {...params} 
							variant="standard"
							sx={{ 
								zIndex: 'tooltip',
								borderBottom: 3,
								borderColor: '#000000',
								backgroundColor: "#f9f9f9",
								}}
							placeholder="Выберите проект для осмотра " />
						)}
						/>
						</motion.div>
					</Grid>
				</Grid>
			</Grid>
		</Box>
  );
}