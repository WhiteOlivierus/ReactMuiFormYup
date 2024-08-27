import { yupResolver } from "@hookform/resolvers/yup";
import {
  Grid,
  Typography,
  TextField,
  Autocomplete,
  IconButton,
  Button,
} from "@mui/material";
import { useForm, Resolver, useFieldArray, Controller } from "react-hook-form";
import { bookStoreValidationScheme, BookStore, bookTypes } from "./BookStore";
import CloseIcon from "@mui/icons-material/Close";

export function Form() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookStore>({
    resolver: yupResolver(
      bookStoreValidationScheme
    ) as unknown as Resolver<BookStore>,
    defaultValues: {
      name: "",
      books: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "books",
  });

  const onSubmit = (data: BookStore) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Book Store</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Name Of Book Store"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Books</Typography>
        </Grid>

        {errors.books && (
          <Grid item xs={12}>
            <Typography color="error">
              {errors.books?.message as string}
            </Typography>
          </Grid>
        )}

        {fields.length === 0 ? (
          <Grid item xs={12}>
            <Typography color="textSecondary">
              No books added yet. Please add a book.
            </Typography>
          </Grid>
        ) : (
          fields.map((book, index) => (
            <Grid container spacing={2} padding={2} key={book.id}>
              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name={`books.${index}.type`}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={bookTypes}
                      freeSolo
                      onChange={(_, value) => field.onChange(value)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Book Type"
                          error={!!errors.books?.[index]?.type}
                          helperText={errors.books?.[index]?.message}
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
                  {...register(`books.${index}.title`)}
                  error={!!errors.books?.[index]?.title}
                  helperText={errors.books?.[index]?.title?.message}
                  fullWidth
                />
              </Grid>

              <Grid item xs={11} md={3}>
                <TextField
                  label="Amount"
                  type="number"
                  {...register(`books.${index}.amount`)}
                  error={!!errors.books?.[index]?.amount}
                  helperText={errors.books?.[index]?.amount?.message}
                  fullWidth
                />
              </Grid>

              <Grid
                item
                xs={1}
                md={1}
                alignContent={"center"}
                justifyContent={"center"}
              >
                <IconButton color="error" onClick={() => remove(index)}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))
        )}

        <Grid item xs={6}>
          <Button
            variant="outlined"
            onClick={() =>
              append({
                type: "",
                title: "",
                amount: 1,
              })
            }
            fullWidth
          >
            Add Book
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
