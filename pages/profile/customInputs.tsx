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
 
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useToast } from "@/components/ui/use-toast";
import { ShieldAlert } from 'lucide-react';

export const CustomTextInput = ({ label, classname, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className={classname}>
        <Label htmlFor={props.name}>{label}</Label>
        <Input {...field} {...props}/>
        {meta.error ? 
          <div className="text-white bg-red-600 rounded-md p-4 m-2 flex flex-row gap-4 absolute">
            <ShieldAlert />
            {meta.error.toString()}
          </div> : null}
    </div>
  );
};

export const CustomSelect = ({ label, placeholder, options, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const {setValue} = helpers;
  const toast = useToast()

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
      {meta.error ? 
          <div className="text-white bg-red-600 rounded-md p-4 m-2 flex flex-row gap-4 absolute">
            <ShieldAlert />
            {meta.error.toString()}
          </div> : null}
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
        {meta.error ? 
          <div className="text-white bg-red-600 rounded-md p-4 m-2 flex flex-row gap-4 absolute">
            <ShieldAlert />
            {meta.error.toString()}
          </div> : null}
    </div>
  );
};
 