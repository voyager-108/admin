import * as React from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import FilterDistrict from './FilterDistrict'
import { useDispatch } from "react-redux"
import { resetDistrictsSlice } from '../../store/districtsSlice'
import { resetRadiusSlice } from '../../store/radiusSlice'
import { chooseOption, resetMap } from '../../store/mapSlice'

function TabPanel(props) {

  const { children, value, index, ...other } = props;

  return (
    <div
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0, mt: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch()

  const handleChange = (event, newValue) => {
	dispatch(resetDistrictsSlice())
	dispatch(resetRadiusSlice())
	dispatch(resetMap())
	dispatch(chooseOption(newValue))
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
        <Tabs 
		sx={{'&.Mui-selected': {
						color: '#000000',
						fontWeight: 'bold',
					},}}
		textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
		value={value} centered onChange={handleChange}>
        <Tab
		   sx={{
			textTransform: 'none',
			minWidth: 0,
			fontSize: '18.5px',
			fontWeight: 'bold',
			color: '#000000',
			fontFamily: [
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(','),
			'&:hover': {
				color: '#000000',
				opacity: 1,
			},
			'&.Mui-selected': {
				color: '#000000',
				fontWeight: 'bold',
			},
			'&.Mui-focusVisible': {
				backgroundColor: '#d1eaff',
			},
		   }}
		   label="Подробная статистика"  />     
		</Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FilterDistrict/>
      </TabPanel>
    </Box>
  );
}
