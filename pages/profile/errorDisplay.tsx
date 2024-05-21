import { toast } from '@/components/ui/use-toast';
import { FormikValues, useFormikContext, FormikErrors, FormikTouched } from 'formik';
import { ShieldAlert } from 'lucide-react';

export const ErrorDisplay: React.FC = () => {
  const { errors, touched } = useFormikContext<FormikValues>();

  return (
    <div>
      {Object.keys(errors).map((key) => {
        const error = (errors as FormikErrors<FormikValues>)[key as keyof FormikValues];
        const isTouched = (touched as FormikTouched<FormikValues>)[key as keyof FormikValues];
        
        if (isTouched && error) {
          return (
            <div key={key} className="text-white bg-red-600 rounded-md p-4 m-2 flex flex-row gap-4">
              <ShieldAlert />
              {error.toString()}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};