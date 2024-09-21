
const CategoryCard = ({category}: {
    category: string
}) => {
    return (
        <div className="border border-slate-500 rounded-md w-full h-fit max-w-sm">
            <div className="relative">
                <img src="https://citizentv.obs.af-south-1.myhuaweicloud.com/111511/conversions/Sauti-og_image.webp" alt="" width="100%" height="100%" className="rounded-t-md" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-20 rounded-b-md"></div>
                <h1 className="text-white absolute bottom-0 z-20 text-3xl font-bold p-5">{category}</h1>
            </div>
        </div>
    )
}

export default CategoryCard