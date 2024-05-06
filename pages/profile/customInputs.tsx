import { ErrorMessage, useField } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const CustomTextInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div>
        <Label htmlFor={props.name}>{label}</Label>
        <Input {...field} {...props}/>
        {meta.touched && meta.error ? (
        <ErrorMessage name={props.name}></ErrorMessage> // prop component toevoegen voor opmaak van errormessage https://formik.org/docs/api/errormessage
        ) : null}
    </div>
  );
};

export const CustomSelect = ({ label, placeholder, options, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const {setValue} = helpers;
  return (
    <div>
      <Label htmlFor={props.name}>{label}</Label>
      <Select {...props} defaultValue={options.value}
        onValueChange={(value: any) => {setValue(value)}}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder}/>
        </SelectTrigger>
        <SelectContent>
          {options.map((option: any) => (
            <SelectItem key={option.id} value={option.value}>{option.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {meta.touched && meta.error ? (
        <ErrorMessage name={props.name}></ErrorMessage>
      ) : null}
    </div>
  );
};

export const CustomCheckboxenInput = ({ label, placeholder, options, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const {setValue} = helpers;
  return (
    <div>
      <Label htmlFor={props.name}>{label}</Label>
      {options.map((item: any) => (
        <Checkbox {...field} {...props} key={item.id} checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked: boolean) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== item.id
                                      )
                                    )
                              }}
                            />
      ))}
      <Select {...props} defaultValue={options.value}
        onValueChange={(value: any) => {setValue(value)}}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder}/>
        </SelectTrigger>
        <SelectContent>
          {options.map((option: any) => (
            <SelectItem key={option.id} value={option.value}>{option.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {meta.touched && meta.error ? (
        <ErrorMessage name={props.name}></ErrorMessage>
      ) : null}
    </div>
  );
};