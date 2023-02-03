import { useParams } from "react-router-dom";
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
import DetailRow from "../../components/DetailRow";
import { tokens } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect } from "react";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [openAdd, setOpenAdd] = useState(false);

  const handleFormSubmit = (values) => {
    console.log(values);

    setOpenAdd(false);
  };

  //fetch data
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const dataFetch = async () => {
      const data2 = await (
        await fetch(`https://localhost:7293/api/User/user?id=${id}`)
      ).json();
      setData(data2);
    };
    dataFetch();
  }, []);

  return (
    <Box m="20px">
      <Header title="USER DETAILS" subtitle="DETAILS ABOUT USER" />
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <DetailRow title="Name" subtitle={data && data.name} />
        <DetailRow title="Surname" subtitle={data && data.surname} />
        <DetailRow title="Email" subtitle={data && data.email} />
        <DetailRow title="Phone" subtitle={data && data.contactNumber} />
        <DetailRow title="Address" subtitle={data && data.address} />
        <DetailRow title="Role" subtitle={data && data.role} />

        <Button
          onClick={() => {
            setOpenAdd(true);
          }}
          color="secondary"
          variant="contained"
        >
          Add Child
        </Button>
      </Box>

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
export default UserDetails;
