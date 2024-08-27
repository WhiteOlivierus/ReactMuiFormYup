import { Paper, Container, CssBaseline } from "@mui/material";
import { Form } from "./Form";

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ paddingTop: "5rem" }}>
        <Paper elevation={3}>
          <Form />
        </Paper>
      </Container>
    </>
  );
}

export default App;
