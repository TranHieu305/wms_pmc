import { Input, Select } from "antd";

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
            <Input {...props}/>
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
                {...props} />
            {props.error && <InputError message={props.error}/>}
        </>
	);
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
    Label,
    SelectInput
}

export default SharedInput;