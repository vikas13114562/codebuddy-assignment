import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Form1 from '../../component/Form1';
import Form2 from '../../component/Form2';
import Form3 from '../../component/Form3';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({onNext,setOnNext}) {
  const [value, setValue] = React.useState(0);
  const [formDisable,setFormDisable] = React.useState({
    formOne:false,
    formTwo:true,
    formThree:true,
  })
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Form 1" {...a11yProps(0)} disabled={formDisable?.formOne} />
        <Tab label="Form 2" {...a11yProps(1)} disabled={formDisable?.formTwo}  />
        <Tab label="Form 3" {...a11yProps(2)} disabled={formDisable?.formThree} />
        
      </Tabs>
      <TabPanel value={value} index={0}>
        <Form1 
            setValue={setValue}
            setFormDisable={setFormDisable}
            setOnNext={setOnNext}
            onNext={onNext}
           
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Form2 
             setValue={setValue}
             setFormDisable={setFormDisable}
             setOnNext={setOnNext}
             onNext={onNext}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Form3
            setValue={setValue}
            setFormDisable={setFormDisable}
            setOnNext={setOnNext}
            onNext={onNext}
            value={value}
        />
      </TabPanel>
     
    </Box>
  );
}