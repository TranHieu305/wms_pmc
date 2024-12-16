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

function ContentContainer({children}) {
    return <div className="p-6">{children}</div>
}

function BoardContainer({children}) {
    return <div className="board-container">{children}</div>
}

const BoardPage = {
    Subheader,
    ContentContainer,
    BoardContainer
}

export default BoardPage