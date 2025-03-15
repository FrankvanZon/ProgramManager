import { FieldValues, useController, UseControllerProps } from "react-hook-form"
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'

type Props<T extends FieldValues> = {
} & UseControllerProps<T> & DatePickerProps<Date>

export default function DateInput<T extends FieldValues>(props: Props<T>) {
    const  {field, fieldState} = useController({...props})

    return(
        <DatePicker 
            {...props}
            displayWeekNumber={true}
            value={field.value ? new Date(field.value) : null}
            onChange={value =>(
                field.onChange(new Date(value!))
            )}
            sx={{width: '100%'}}
            slotProps={{
                textField: {
                    onBlur: field.onBlur,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message
                }
            }}        
        />
    )
}

            //How to use a in a form
                {/* <DateInput label='Release Date'
                    control={control}
                    name='releaseDate'
                /> */}

            // For validation in a schema
                // releaseDate: z.coerce.date({
                //     message: 'Date is required'
                // }),
