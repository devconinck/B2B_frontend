import { useField } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useToast } from "@/components/ui/use-toast";
import { ShieldAlert } from 'lucide-react';

export const CustomTextInput = ({ label, classname, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className={classname}>
        <Label htmlFor={props.name}>{label}</Label>
        <Input {...field} {...props}/>
        <ErrorField error={meta.error} message={meta.error?.toString()}/>
    </div>
  );
};

export const CustomSelect = ({ label, placeholder, options, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const {setValue} = helpers;

  return (
    <div>
      <Label htmlFor={props.name}>{label}</Label>
      <Select {...props} value={field.value}
        onValueChange={(value: any) => {setValue(value)}}
      >
        <SelectTrigger>
          <SelectValue {...field}/>
        </SelectTrigger>
        <SelectContent>
          {options.map((option: any) => (
            <SelectItem key={option.id} value={option.value}>{option.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ErrorField error={meta.error} message={meta.error?.toString()}/>
    </div>
  );
};

export const CustomCheckbox = ({ options, label, disabled, ...props }: any) => {

  const [field, meta, helpers] = useField(props); 

  const handleCheck = (checked: CheckedState, option: any) => {
    if (checked) {
      helpers.setValue([...field.value, option.value]);
    } else {
      helpers.setValue(field.value.filter((value: any) => value !== option.value));
    }
  };

  return (
    <div {...props}>
        <Label>{label}</Label>
        {options.map((option: any) => (
          <div key={option.id}>
            <Checkbox
              id={option.id}
              name={option.name} 
              disabled={disabled} 
              checked={field.value.includes(option.value)} 
              onCheckedChange={(checked) => handleCheck(checked, option)}
            />
            <Label className="mx-2">{option.name}</Label>
          </div>
        ))}
        <ErrorField error={meta.error} message={meta.error?.toString()}/>
    </div>
  );
};

export const ErrorField = ({error, message}: any) => {
  return (
    <div>
      {error ? 
        <div className="text-white bg-red-600 rounded-md p-4 m-2 flex flex-row gap-4 absolute">
          <ShieldAlert />
          {message}
        </div> : null}
    </div>
  );
};
 