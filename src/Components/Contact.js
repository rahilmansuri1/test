import React, { useState } from 'react'
import axios from 'axios';


const Contact = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [desc, setDesc] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const restForm = () => {
        setName("");
        setEmail("")
        setSubject("")
        setDesc("")
        setError("");

    }
    const AddContact = async (e) => {
        e.preventDefault();
        if (name === "" || email === "" || subject === "") {
            setLoading(false)
            setError("Fields are mandatory")
        } else {
            setLoading(true)
            await axios.post('http://localhost:8080/contact/create', {
                name: name,
                email: email,
                subject: subject,
                desc: desc
            })
                .then(function (response) {
                    console.log(response);
                    setLoading(false)
                    setShowModal(true)
                    restForm()
                })
                .catch(function (error) {
                    console.log(error);
                    setLoading(false)
                    setShowModal(false)
                    setError("Something went wrong")

                });
        }
    }
    return (
        <>
            {
                showModal === true
                    ?
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex  bg-gray-900 items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl text-green-300 font-semibold">
                                            Thank You !
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
                                        <p className="my-4 text-slate-300 text-lg leading-relaxed">
                                            Thanks ! for submitting your query, team will reach out as soon as possible
                                        </p>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex bg-gray-900 items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-80 fixed inset-0 z-40 bg-black-500"></div>
                    </>

                    :
                    <section>
                        <div class="py-8 lg:py-6 px-4 mx-auto max-w-screen-md">
                            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                            <p class="mb-8 lg:mb-10 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                            <form onSubmit={AddContact} class="space-y-4">
                                <div>
                                    <label htmlFor="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                                    <input onChange={(e) => setName(e.target.value)} type="text" id="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Your name" />
                                </div>
                                <div>
                                    <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="abc@email.com" />
                                </div>
                                <div>
                                    <label htmlFor="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                                    <input onChange={(e) => setSubject(e.target.value)} type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" />
                                </div>
                                <div class="sm:col-span-2">
                                    <label htmlFor="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                                    <textarea onChange={(e) => setDesc(e.target.value)} id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                                </div>
                                <p className="text-[red]" >{error} </p> {" "}
                                <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-[#a855f7] sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 hover:bg-primary-700 dark:focus:ring-primary-800">{loading ? "Sending" : 'Send message'}</button>
                            </form>
                        </div>
                    </section>
            }
        </>
    )
}

export default Contact