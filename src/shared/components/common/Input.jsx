import { DatePicker, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

function Label({forName, children}) {
    return (
    <label className="block text-[rgba(33,43,54,1)] text-[14px] font-normal leading-[22px] "
            htmlFor={forName}>
        {children}
    </label>)
}

function Text({...props}) {
    return (
        <>
            <Input 
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                {...props}
            />
            {props.error && <InputError message={props.error}/>}
        </>
    )
}

function TextAreaCustom({...props}) {
    return (
        <>
            <TextArea 
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none"
                rows={4} 
                {...props}
            />
            {props.error && <InputError message={props.error}/>}
        </>
    )
}

function SelectInput({value, onChange, options,...props}) {
    return (
        <>
            <Select key={"select" + value} 
                value={value} 
                onChange={(value) => onChange(value)} 
                options={options}
                {...props} 
            />
            {props.error && <InputError message={props.error}/>}
        </>
	);
}

function DatePickerCustom({value, onChange, options,...props}) {
    return (
        <> 
            <DatePicker key={"date-picker" + value}
                value={value} 
                onChange={(value) => onChange(value)} 
                {...props}
            />
            {props.error && <InputError message={props.error}/>}
        </>
    )
}

function InputError({ message }) {
    return (
        <div className={`max-w-full flex flex-row items-start justify-start gap-1 leading-[normal] tracking-[normal] text-left text-sm text-sate-error font-montserrat`}>
            <div className="flex flex-col items-start justify-start pt-[1.5px] px-0 pb-0 box-border max-w-[calc(100%_-_28px)]">
                <div className="relative leading-[150%] text-[#FF5630]">
                    {message}
                </div>
            </div>
         </div>
    )
}

const SharedInput = {
    Text,
    TextAreaCustom,
    Label,
    SelectInput, 
    DatePickerCustom
}

export default SharedInput;