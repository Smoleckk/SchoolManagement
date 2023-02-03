import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Modal,
  styled,
  Typography,
  useTheme,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);


  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [sele, setSele] = useState();
  const [initEvents, setinitEvents] = useState([
    {
      id: "12315",
      title: "All-day event",
      date: "2023-02-02",
    },
    {
      id: "5123",
      title: "Timed event",
      date: "2023-01-31",
    },
  ]);



  const handleFormSubmit = (values) => {
    console.log(values);
    const title = values.firstName;
    const calendarApi = sele.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${sele.dateStr}-${title}`,
        title,
        start: sele.startStr,
        end: sele.endStr,
        allDay: sele.allDay,
      });
    }
    setOpenAdd(false);

  };

  const handleDateClick = (selected) => {
    setOpenAdd(true);
    setSele(selected);
  };

  const handleEventClick = (selected) => {
    setOpen(true);
    setSele(selected);
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" flex-wrap="wrap" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={event.startStr}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={false}
            dayMaxEvents={true}
            select={handleDateClick}
            minDate={new Date(2023, 2, 25)}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={initEvents}
          />
        </Box>
      </Box>
      <StyledModal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          backgroundColor={colors.primary[400]}
          p={3}
          borderRadius={5}
          width={400}
          height={280}
        >
          <Typography variant="h6" textAlign="center">
            Delete event
          </Typography>
          <Button
            onClick={() => {
              sele.event.remove();
              setOpen(false);
            }}
            color="secondary"
            variant="contained"
          >
            Delete forever
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="secondary"
            variant="contained"
          >
            Close
          </Button>
        </Box>
      </StyledModal>

      <StyledModal
        open={openAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          backgroundColor={colors.primary[400]}
          p={3}
          borderRadius={5}
          width={400}
          height={280}
        >
          <Typography variant="h6" textAlign="center">
            Add event
          </Typography>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Create New User
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
          <Button
            onClick={() => {
              setOpenAdd(false);
            }}
            color="secondary"
            variant="contained"
          >
            Close
          </Button>
        </Box>
      </StyledModal>
    </Box>
  );
};
const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
};
export default Calendar;
