import { Grid, Autocomplete, TextField, IconButton } from "@mui/material";
import {
  Control,
  UseFormRegister,
  FieldErrors,
  Controller,
} from "react-hook-form";
import { BookStore, bookTypes } from "./BookStore";
import DeleteIcon from "@mui/icons-material/Delete";

interface BookInputRowProps {
  control: Control<BookStore>;
  index: number;
  register: UseFormRegister<BookStore>;
  errors: FieldErrors<BookStore>;
  onDelete: () => void;
}

export const BookInputRow = (props: BookInputRowProps) => (
  <Grid container spacing={2} padding={2}>
    <Grid item xs={12} md={4}>
      <Controller
        control={props.control}
        name={`books.${props.index}.binding`}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={bookTypes}
            autoFocus
            freeSolo
            onChange={(_, value) => field.onChange(value)}
            onInput={(value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Book Type"
                error={!!props.errors.books?.[props.index]?.binding}
                helperText={props.errors.books?.[props.index]?.binding?.message}
                fullWidth
              />
            )}
          />
        )}
      />
    </Grid>

    <Grid item xs={12} md={4}>
      <TextField
        label="Book Title"
        {...props.register(`books.${props.index}.title`)}
        error={!!props.errors.books?.[props.index]?.title}
        helperText={props.errors.books?.[props.index]?.title?.message}
        fullWidth
      />
    </Grid>

    <Grid item xs={12} md={3}>
      <TextField
        label="Amount"
        type="number"
        {...props.register(`books.${props.index}.amount`)}
        error={!!props.errors.books?.[props.index]?.amount}
        helperText={props.errors.books?.[props.index]?.amount?.message}
        fullWidth
      />
    </Grid>

    <Grid item xs={1} marginTop={1}>
      <IconButton color="error" onClick={props.onDelete}>
        <DeleteIcon />
      </IconButton>
    </Grid>
  </Grid>
);
