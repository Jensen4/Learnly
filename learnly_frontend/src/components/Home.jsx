import { useState } from 'react'
import { MdFileUpload } from "react-icons/md";

export default function Home() {
    const [fileType, setFileType] = useState("");

    function handleUpload() {
        console.log("uploaded");
    }

    function handleSubmit() {
        console.log("submitted");
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-zinc-100 pl-70'>
            <div className='flex flex-col space-x-10 h-[80vh] w-[60vw]'>
                <label htmlFor="fileUpload" className="cursor-pointer h-full w-full bg-zinc-300 rounded-xl flex flex-col items-center justify-center space-y-10">
                    <MdFileUpload  className="scale-500" />
                    <p className="text-4xl">Add a file to upload</p>
                </label>
                <input id="fileUpload" type="file" onChange={handleUpload} className='hidden' />
                <span className="flex flex-row justify-between py-5 text-2xl">
                    <select className="cursor-pointer" onChange={(e) => {setFileType(e.option.value)}}>
                        <option value="notes">Notes</option>
                        <option value="lecture">Lecture</option>
                        <option value="readings">Readings</option>
                    </select>
                    <button onClick={handleSubmit} className="cursor-pointer bg-green-400 rounded-2xl p-4">
                        <p className="">Submit File</p>
                    </button>
                </span>
            </div> 
        </div>
    )
}