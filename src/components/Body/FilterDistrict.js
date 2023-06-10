import { useSelector, useDispatch } from "react-redux";
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid , Box, Select, FormControl, MenuItem, ListItemText, Checkbox, OutlinedInput, List, Chip, ListItem, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import axios from 'axios'

import { chooseTypes } from '../../store/districtsSlice';
import { chooseObjects, choosePoint } from "../../store/mapSlice";


export default function BasicCard() {

	const totalData = useSelector((state) => state.districts)
	const chosenDistricts = useSelector((state) => state.districts.chosenDistricts);
	const chosenMap = useSelector((state) => state.map.mapReference);

	const columns = [
		{ field: 'id',
		headerName: 'Id',
		width: 80,
		editable: true
		},
		{
		  field: 'projectName',
		  headerName: 'Проект',
		  width: 80,
		  editable: true,
		},
		{
		  field: 'buildingName',
		  headerName: 'Здание',
		  width: 80,
		  editable: true,
		},
		{
			field: 'sectionName',
			headerName: 'Секция',
			width: 80,
			editable: true,
		},
		{
			field: 'flatName',
			headerName: 'Квартира',
			width: 80,
			editable: true,
		},
		{
			field: 'percentage',
			headerName: 'Готовность',
			width: 80,
			editable: true,
		},
		
	  ];

	  const rows = [
		{ id: 212, projectName: "Строгино", buildingName: 'Первый корпус', sectionName: 'Секция 42', flatName: '347', percentage: '79%' },
		{ id: 213, projectName: "Строгино", buildingName: 'Первый корпус', sectionName: 'Секция 42', flatName: '347', percentage: '79%' },
		{ id: 214, projectName: "Строгино", buildingName: 'Первый корпус', sectionName: 'Секция 42', flatName: '347', percentage: '79%' },
		{ id: 215, projectName: "Строгино", buildingName: 'Первый корпус', sectionName: 'Секция 42', flatName: '347', percentage: '79%' },
		{ id: 216, projectName: "Строгино", buildingName: 'Первый корпус', sectionName: 'Секция 42', flatName: '347', percentage: '79%' },
		{ id: 217, projectName: "Строгино", buildingName: 'Первый корпус', sectionName: 'Секция 42', flatName: '347', percentage: '79%' },
		{ id: 218, projectName: "Строгино", buildingName: 'Первый корпус', sectionName: 'Секция 42', flatName: '347', percentage: '79%' },
		{ id: 219, projectName: "Строгино", buildingName: 'Первый корпус', sectionName: 'Секция 42', flatName: '347', percentage: '79%' },
		{ id: 220, projectName: "Строгино", buildingName: 'Первый корпус', sectionName: 'Секция 42', flatName: '347', percentage: '79%' },
	  ];  

	const dispatch = useDispatch()
	const types = [
		{label: 'Киоски',
		 type: 'kiosks'},
		{label: 'Государственные Услуги',
		 type: 'gosuslugi'},
		{label: 'Библиотеки',
		 type: 'libraries'},
		{label: 'Спортивные объекты',
		 type: 'sport'},
		{label: 'Дома Культуры',
		 type: 'culture_clubs'},
	];
	const [typeName, setTypeName] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	async function handleClick (name) {

		setLoading(true);

		const districtNames = totalData.chosenDistricts.map((item) =>{
			return item.api_name
		})
		const districtTypes = totalData.chosenTypes.map((item) => {
			return item.type
		})
		
		if (chosenDistricts.length > 0){
			if(districtTypes.length > 0){
				if ('parent_id' in chosenDistricts[0]){
					console.log('not administrative')
					const main_api = "https://postamat-api.vercel.app/api/postamat/district?district=" + districtNames.join('&district=') + '&type='+districtTypes.join('&type=') + '&model=' + name
					console.log(main_api)
					axios.get(main_api)
						.then(response => {
							dispatch(chooseObjects(response.data));
							setLoading(false);
						})
						.catch((error) => {
							console.error(error);
							setLoading(false);
						})
				}
				else{
					console.log('administrative')
					const main_api = "https://postamat-api.vercel.app/api/postamat/admin?admin=" + districtNames.join('&admin=') + '&type='+districtTypes.join('&type=') + '&model=main'
					console.log(main_api)
					axios.get(main_api)
						.then(response => {
							dispatch(chooseObjects(response.data));
							setLoading(false);
						})
						.catch((error) => {
							console.error(error);
							setLoading(false);
						})
				}
			}
			else{
				setLoading(false);
			}
		}
		else{
			setLoading(false);
		}

	};

	const handleTypeChange = (event) => {
		const {
			target: { value },
		} = event;

		setTypeName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		);
		const foundVariableName = types.filter((item) => {
			return event.target.value.includes(item.label)
		})
		console.log(event.target.value)
		console.log(foundVariableName)
		dispatch(chooseTypes(foundVariableName));
	};

  return (

	<Box
	sx={{
	border: 0, 
	height: "100%",
	width: '100%',
	borderColor: '#bfbfbf',
	backgroundColor: "#f9f9f9",
	boxShadow: 0,
	borderRadius: 2,
	p: 2,
	minWidth: 300,
	}}
	>
        
        <Typography sx={{fontSize: "18.5px", m:1, fontWeight: 'bold'}} color="#000000" >
			<Grid container>
				<Grid item xs={6}>
				Выберите здания :
				</Grid>
				<Grid item xs={6}>
				<FormControl sx={{ width:'100%',  border: 0, borderRadius: 1  }}>
					<Select
							sx={{
								mt: '0',
								width: '100%',
								bgcolor: 'transparent',
								position: 'relative',
								overflow: 'auto',
								maxHeight: 50,
								border: 2,
								borderRadius: 1
							}}
						labelId="demo-multiple-chip-label"
						id="demo-multiple-chip"
						multiple
						value={typeName}
						onChange={handleTypeChange}
						renderValue={(selected) => selected.join(', ')}
						input={<OutlinedInput sx={{ border: 0, borderRadius: 1 }} />}
						>
						{types.map((name) => (
							<MenuItem key={name.label} value={name.label}>
							<Checkbox checked={typeName.indexOf(name.label) > -1} />
							<ListItemText primary={name.label} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				</Grid>
			</Grid>
        </Typography>

        <Typography sx={{fontSize: "18.5px", m:1, fontWeight: 'bold'}} color="#000000" >
			<Grid container>
				<Grid item xs={6}>
				Выберите секции :
				</Grid>
				<Grid item xs={6}>
				<FormControl sx={{ width:'100%',  border: 0, borderRadius: 1  }}>
					<Select
							sx={{								
							mt: '0',
							width: '100%',
							bgcolor: 'transparent',
							position: 'relative',
							overflow: 'auto',
							maxHeight: 50,
							border: 2,
							borderRadius: 1
							}}
						labelId="demo-multiple-chip-label"
						id="demo-multiple-chip"
						multiple
						value={typeName}
						onChange={handleTypeChange}
						renderValue={(selected) => selected.join(', ')}
						input={<OutlinedInput sx={{ border: 0, borderRadius: 1 }} />}
						>
						{types.map((name) => (
							<MenuItem key={name.label} value={name.label}>
							<Checkbox checked={typeName.indexOf(name.label) > -1} />
							<ListItemText primary={name.label} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				</Grid>
			</Grid>
        </Typography>

        <Typography sx={{fontSize: "18.5px", m:1, fontWeight: 'bold'}} color="#000000" >
			<Grid container>
				<Grid item xs={6}>
				Выберите этаж :
				</Grid>
				<Grid item xs={6}>
				<FormControl sx={{ width:'100%',  border: 0, borderRadius: 1  }}>
					<Select
							sx={{								
							mt: '0',
							width: '100%',
							bgcolor: 'transparent',
							position: 'relative',
							overflow: 'auto',
							maxHeight: 50,
							border: 2,
							borderRadius: 1
							}}
						labelId="demo-multiple-chip-label"
						id="demo-multiple-chip"
						multiple
						value={typeName}
						onChange={handleTypeChange}
						renderValue={(selected) => selected.join(', ')}
						input={<OutlinedInput sx={{ border: 0, borderRadius: 1 }} />}
						>
						{types.map((name) => (
							<MenuItem key={name.label} value={name.label}>
							<Checkbox checked={typeName.indexOf(name.label) > -1} />
							<ListItemText primary={name.label} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
				</Grid>
			</Grid>
        </Typography>

		<Box sx={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
				pagination: {
					paginationModel: {
					pageSize: 5,
					},
				},
				}}
				pageSizeOptions={[5]}
				checkboxSelection
				disableRowSelectionOnClick
			/>
		</Box>

    </Box>
  );
}
