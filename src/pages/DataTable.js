import { FcSearch } from "react-icons/fc";
import { FcFilledFilter } from "react-icons/fc";

const DataTable = () =>{


    return(
        <div className="h-screen w-screen border border-black flex flex-col justify-center items-center gap-2">
            <h1 className="text-black text-xl p-3 border shadow-xl rounded-md">Person Details</h1>
            <div className="border border-black h-[80%] w-[70%] shadow-xl rounded-md">
                <div className="h-[15%] w-full border border-green-500 flex justify-between">
                    <button className="border border-gray-500 m-5 p-2 flex justify-evenly text-md w-[15%] shadow-xl rounded-md">
                        Filters
                        <FcFilledFilter className="text-2xl" />
                    </button>
                    <span className="border border-black p-3 m-5 flex rounded-md ">
                        <input  placeholder="Search" className=" outline-none " />
                        <FcSearch className="text-xl" />
                    </span>
                </div>
            <table>
                <thead>
                    <tr>

                    </tr>
                </thead>

            </table>

            </div>
        </div>
    )

}

export default DataTable