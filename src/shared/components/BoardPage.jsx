function Subheader({icon, title, children}) {
    return(
        <div className="flex justify-between items-center p-4">
            <div className="flex items-center space-x-2">
                {icon}
                <span className="text-lg font-semibold text-gray-800">{title}</span>
            </div>

            <div className="flex items-center space-x-2">
                {children}
            </div>
        </div>
    );
}

function BoardContainer({children}) {
    return <div>{children}</div>
}


const BoardPage = {
    Subheader,
    BoardContainer
}

export default BoardPage