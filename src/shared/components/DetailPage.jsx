import { Button } from "antd";
import { Link } from "react-router-dom";
import SharedIcon from "./common/Icon";

function Layout({children}) {
    return <div className="px-20">{children}</div>
}

function Subheader({title, id, backLink, children}) {
    return(
        <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
                <Link to={backLink}>
					<Button type="link" icon={<SharedIcon.Back width={40} height={40}/>}>
						
					</Button>
				</Link>
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">
                        {title}
                    </h1>
                    {id && (<p className="text-sm text-gray-500">
                        ID: <span className="text-green-500 font-medium">{id}</span>
                    </p>)
                    }
                </div>
            </div>
           {children}
    </div>
    );
}

function DetailContainer({children}) {
    return <div className="rounded-md shadow-md bg-white">{children}</div>
}

function InforCard({children}) {
    return <div className="p-6">{children}</div>
}

function InforItem({label, value, children}) {
    return (
        <div>
            <p className=" text-gray-800">{label}</p>
            <p className=" text-gray-500">
            
                {value}
                {children}
            </p>
        </div>
    )
}

const DetailPage = {
    Layout,
    Subheader,
    DetailContainer,
    InforCard,
    InforItem
}

export default DetailPage;