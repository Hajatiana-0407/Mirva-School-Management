
const Loading = ( {size ='lg'}) => {
    let height = 'h-8'  ; 
    if( size == 'lg' ) {
        height = 'h-15'
    }
    return (
        <div className={`flex items-center py-5 ${height} justify-center`} >
            <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-5 bg-gray-300 rounded-full animate-pulse`}
                        style={{
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: "1s",
                            animationIterationCount: "infinite",
                            animationName: "scaleUp",
                            animationTimingFunction: "ease-in-out",
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default Loading