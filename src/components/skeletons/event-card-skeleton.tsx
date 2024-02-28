
export const EventCardSkeleton = () => {
    return <div className=" w-80 bg-white p-2.5 rounded-md border border-white relative space-y-4" >
        <div className="object-fill rounded-md h-40 bg-slate-400 animate-pulse" />
        <div className="space-y-4">
            <h1 className="font-bold text-2xl h-8 w-40 bg-slate-400 rounded-md animate-pulse"></h1>
            <p className="text-slate-500 overflow-ellipsis h-14 bg-slate-400 rounded-md animate-pulse"></p>
        </div>
    </div>
}