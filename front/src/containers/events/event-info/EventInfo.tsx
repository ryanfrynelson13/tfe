import { Tabs } from "@mui/material"
import EventDescription from "../../../components/event/event-description/EventDescription"
import EventDetails from "../../../components/event/event-details/EventDetails"
import { DetailledEvent } from "../../../types/events/detailled-event.type"
import Reviews from "../../reviews/Reviews"
import classes from './event-info.module.css'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from "react"

type EventInfoProps = {
    event: DetailledEvent
}


const EventInfo = ({event}:EventInfoProps) => {
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return(
        <div className={classes.info}>            
            <Box sx={{ width: '60vw', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList textColor="inherit" centered onChange={handleChange} aria-label="lab API tabs example">
                        <Tab sx={{fontFamily: 'inherit', fontSize: '1.5rem', borderColor: '#230046'}} label="About" value="1" />
                        <Tab sx={{fontFamily: 'inherit', fontSize: '1.5rem'}} label="Buy Tickets" value="2" />
                        <Tab sx={{fontFamily: 'inherit', fontSize: '1.5rem'}} label="Reviews" value="3" />
                    </TabList>
                    </Box>
                    <TabPanel value="1"><EventDescription {...event} onReviews={handleChange}/></TabPanel>
                    <TabPanel value="2">Buy Tickets</TabPanel>
                    <TabPanel value="3"><Reviews reviews={event.reviews} eventId={event.id}/></TabPanel>
                </TabContext>
            </Box>             
            <EventDetails {...event}/>
        </div>
    )
}

export default EventInfo