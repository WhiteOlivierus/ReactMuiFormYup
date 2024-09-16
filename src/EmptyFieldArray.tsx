import { Grid, IconButton, Button, Typography } from "@mui/material";
import {
  FieldValues,
  Control,
  ArrayPath,
  FieldArray,
  useFieldArray,
  FieldErrors,
} from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";

interface EmptyFieldArrayProps<TModel extends FieldValues> {
  control: Control<TModel>;
  name: ArrayPath<TModel>;
  addText: string;
  renderField: (index: number) => JSX.Element;
  noItemsMessage: JSX.Element;
  appendItem: () =>
    | FieldArray<TModel, ArrayPath<TModel>>
    | FieldArray<TModel, ArrayPath<TModel>>[];
  removeItem?: (index: number) => void;
  errors: FieldErrors<TModel>;
}

export const EmptyFieldArray = <TModel extends FieldValues>(
  props: EmptyFieldArrayProps<TModel>
) => {
  const { fields, append, remove } = useFieldArray({
    control: props.control,
    name: props.name,
  });

  const handleRemove = (index: number) => {
    remove(index);
    if (props.removeItem) {
      props.removeItem(index);
    }
  };
  console.log(props.errors[props.name]);
  const x = props.errors[props.name];
  const isArrayError =
    typeof x === "object" && !Array.isArray(x) && x !== null && props.errors;
  return (
    <Grid container spacing={2} padding={2}>
      {fields.length === 0 ? (
        <Grid item xs={12}>
          {isArrayError ? (
            <Typography color="error">
              {(props.errors[props.name]?.message as string) ?? "Error"}
            </Typography>
          ) : (
            props.noItemsMessage
          )}
        </Grid>
      ) : (
        fields.map((field, index) => (
          <Grid container item spacing={2} padding={2} key={field.id}>
            <Grid item xs={11}>
              {props.renderField(index)}
            </Grid>
            <Grid
              item
              xs={1}
              md={1}
              alignContent={"center"}
              justifyContent={"center"}
            >
              <IconButton color="error" onClick={() => handleRemove(index)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))
      )}
      <Grid item xs={12}>
        <Button
          variant="outlined"
          onClick={() => append(props.appendItem())}
          fullWidth
        >
          {props.addText ? props.addText : "Add Item"}
        </Button>
      </Grid>
    </Grid>
  );
};
