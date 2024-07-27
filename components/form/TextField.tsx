import { Input, InputProps } from "@nextui-org/input";
import { useController } from "react-hook-form";

type Props = InputProps & {
  name: string;
};

export const TextField = ({ name, ...props }: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <Input
      name="name"
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      isInvalid={!!error}
      color={!!error ? "danger" : "default"}
      errorMessage={error?.message}
      type="text"
      variant="bordered"
      fullWidth
      {...props}
    />
  );
};
