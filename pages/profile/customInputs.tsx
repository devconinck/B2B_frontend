import { ErrorMessage, Field, Formik, FormikConsumer, FormikContext, useField, useFormik, useFormikContext } from "formik";
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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { any, z } from "zod"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";

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
      {meta.touched && meta.error ? (
        <ErrorMessage name={props.name}></ErrorMessage>
      ) : null}
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
    <div {...props} {...field}>
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
        {meta.touched && meta.error ? (
          <ErrorMessage name={props.name}></ErrorMessage>
        ) : null}
    </div>
  );
};

 
function onSubmit(data: any) {
  toast({
    title: "You submitted the following values:",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  })
}
 