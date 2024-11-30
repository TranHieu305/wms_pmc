import { Input } from "antd";

function Text({...props}) {
    return (
        <div>
             <Input {...props}/>
            {props.error && <InputError message={props.error}/>}
        </div>
    )
}


function InputError({ message }) {
    return (
        <div
        className={`max-w-full flex flex-row items-start justify-start gap-1 leading-[normal] tracking-[normal] text-left text-sm text-sate-error font-montserrat`}
      >
        <div className="flex flex-col items-start justify-start pt-[1.5px] px-0 pb-0 box-border max-w-[calc(100%_-_28px)]">
            <div className="relative leading-[150%] text-[#FF5630]">
                {message}
            </div>
        </div>
      </div>
    )
}

const SharedInput = {
    Text
}

export default SharedInput;