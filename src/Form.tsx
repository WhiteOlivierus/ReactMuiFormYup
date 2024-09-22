import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography, TextField, Button } from "@mui/material";
import { useForm, Resolver, useFieldArray } from "react-hook-form";
import { bookStoreValidationScheme, BookStore } from "./BookStore";
import { BookInputRow } from "./BookInputRow";

export const Form = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookStore>({
    resolver: yupResolver(bookStoreValidationScheme) as Resolver<BookStore>,
    defaultValues: {
      name: "",
      books: [],
    },
  });

  const onSubmit = (data: BookStore) => {
    alert(`Form Data: ${JSON.stringify(data)}`);
  };

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "books",
  });

  const addBook = () => append({ binding: "", amount: 0, title: "" });
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Create Book Store</Typography>
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

        <Grid item xs={12}>
          {fields.length === 0 ? (
            (!!errors.books as boolean) ? (
              <Typography color="error">
                {errors.books?.message ?? errors.books?.root?.message}
              </Typography>
            ) : (
              <Typography color="textSecondary">
                No books added yet. You need at least one book for your book
                store.
              </Typography>
            )
          ) : (
            fields.map((_, index) => (
              <BookInputRow
                key={index}
                errors={errors}
                control={control}
                register={register}
                index={index}
                onDelete={() => remove(index)}
              />
            ))
          )}
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined" fullWidth onClick={addBook}>
            Add book
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
