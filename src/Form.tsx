import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography, TextField, Button } from "@mui/material";
import { useForm, Resolver } from "react-hook-form";
import { bookStoreValidationScheme, BookStore } from "./BookStore";
import { BookInputRow } from "./BookInputRow";
import { EmptyFieldArray } from "./EmptyFieldArray";

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

        <EmptyFieldArray
          control={control}
          name="books"
          errors={errors}
          renderField={(index: number) => (
            <BookInputRow
              errors={errors}
              control={control}
              register={register}
              index={index}
            />
          )}
          noItemsMessage={
            <Typography color="textSecondary">
              No books added yet. Please add a book.
            </Typography>
          }
          addText="Add book"
          appendItem={() => ({
            type: "",
            title: "",
            amount: 1,
          })}
        />

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => console.log()}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
