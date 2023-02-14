import React, { useState } from 'react'
import axios from 'axios';



export default function ProductModel({ setRefreshKey }) {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [imageURL, setimageURL] = useState("")
    const [qty, setQty] = useState("")
    const [ammount, setAmmount] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const restForm = () => {
        setTitle("");
        setDesc("");
        setimageURL("")
        setQty("")
        setAmmount("")
        setError("");

    }

    const AddProduct = async (e) => {
        e.preventDefault();
        if (title === "" || desc === "" || imageURL === "") {
            setLoading(false)
            setError("All fields are mandatory")
        } else {
            setLoading(true)
            await axios.post('http://localhost:8080/product/create', {
                name: title,
                desc: desc,
                imageURL: imageURL,
                quantity: qty,
                price: ammount
            })
                .then(function (response) {
                    console.log(response);
                    setLoading(false)
                    setShowModal(false)
                    restForm()
                    setRefreshKey(oldKey => oldKey + 1)
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false)
                    setShowModal(true)
                    setError("All fields are mandatory")

                });
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setShowModal(true)}
            >
                Add Product
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex  bg-gray-900 items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add Your Product
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-[#a855f7] float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:text-[#1f2937]"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span>
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto bg-gray-900">
                                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                        Don't find customers for your product.
                                        Find products for your customers.
                                    </p>
                                    <div className="mb-3 pt-0">
                                        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Product Name" className="px-3 py-3 placeholder-slate-400 text-slate-900 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input onChange={(e) => setDesc(e.target.value)} value={desc} type="text" placeholder="Description" className="px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input onChange={(e) => setimageURL(e.target.value)} value={imageURL} type="url" placeholder="Image URL" className="px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input onChange={(e) => setQty(e.target.value)} value={qty} type="number" placeholder="Quantity" className="px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                                    </div>
                                    <div className="mb-3 pt-0">
                                        <input onChange={(e) => setAmmount(e.target.value)} value={ammount} type="number" placeholder="Ammount" className="px-3 py-3 placeholder-slate-400 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                                    </div>
                                    <span className="text-[red]" >{error} </span>
                                </div>
                                {/*footer*/}
                                <div className="flex bg-gray-900 items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="bg-[#a855f7] text-white active:bg-[#a855f7] font-bold  text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-[#1f2937] outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={(e) => AddProduct(e)}
                                    >
                                        {loading ? 'Adding..' : "Add Product"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
