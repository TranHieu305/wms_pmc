import { Button } from "antd";
import { Link } from "react-router-dom";
import SharedIcon from "./common/Icon";

function Layout({children}) {
    return <div className="p-6">{children}</div>
}

function Subheader({title, id, backLink, children}) {
    return(
        <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
                <Link to={backLink}>
					<Button type="link" icon={<SharedIcon.Back width={40} height={40}/>}>
						
					</Button>
				</Link>
                <div>
                    <div className="text-lg font-bold text-gray-800">
                        {title}
                    </div>
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

function InfoCard({children}) {
    return <div className="p-6">{children}</div>
}

function InfoItem({label, value, children}) {
    return (
        <div>
            <div className=" text-gray-800 font-medium">{label}</div>
            <div className=" text-gray-500 font-normal">
                {value}
                {children}
            </div>
        </div>
    )
}

function InfoCardTitle({children}) {
    return <div className="text-base font-semibold text-gray-800">{children}</div>
}

const DetailPage = {
    Layout,
    Subheader,
    DetailContainer,
    InfoCard,
    InfoItem,
    InfoCardTitle
}

export default DetailPage;