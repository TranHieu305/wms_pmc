function SubheaderBoardPage({icon, title, children}) {
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



export default SubheaderBoardPage;