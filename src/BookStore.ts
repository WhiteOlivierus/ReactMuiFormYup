import * as yup from "yup";

export const bookTypes = ["Hard-cover", "Soft-cover"];

export interface Book {
  title: string;
  amount: number;
  binding: string;
}

export interface BookStore {
  name: string;
  books: Book[];
}

export const bookStoreValidationScheme = yup.object().shape({
  name: yup.string().required("Name is required"),
  books: yup
    .array()
    .of(
      yup.object().shape({
        title: yup.string().required("Book title is required"),
        amount: yup
          .number()
          .required("Amount is required")
          .positive("Amount must be more than 1")
          .integer("Amount must be an integer"),
        binding: yup.string().required("Book type is required"),
      })
    )
    .min(1, "You need to add at least one book")
    .required("You need to add at least one book"),
});
