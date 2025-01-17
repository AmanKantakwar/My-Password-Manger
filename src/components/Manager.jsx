import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid'




const Manager = () => {
    const ref = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const togglePasswordVisibility = () => {
        const inputField = document.querySelector('input[name="password"]');
        if (inputField.type === "password") {
            inputField.type = "text";
            ref.current.src = "icons/eye.png";
        } else {
            inputField.type = "password";
            ref.current.src = "icons/eyecross.png";
        }
    };


    const copyText = (text) => {
        toast('Copied to Clickboard', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        navigator.clipboard.writeText(text)
    }

    const savePassword = () => {
        if(form.site.length >3 && form.username.length>3 &&form.password.length>3){

       setPasswordArray([...passwordArray, {...form, id:uuidv4()}])
       localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form, id:uuidv4()}]))
       console.log([...passwordArray, form])
       setForm({site: "", username: "", password: ""})
       toast('Password saved', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    else{
        toast("Error: Password not saved")
    }
}

    const deletePassword = (id) =>{
        console.log(`Deleting password with id ${id}`)
        let c =confirm("Do you really want to delete password?")
        if(c){
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        localStorage.setItem("passwords", JSON.stringify (passwordArray.filter(item=>item.id!==id)))
        toast('Password Deleted!', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
}

    const editPassword = (id) =>{
        console.log(`Editing password with id ${id}`)
        setForm(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id !==id))
        
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>
 
            <div className="p-3 md:mycontainer min-h-[88.2vh]">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-green-500">&lt;</span>
                    <span>Pass</span><span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center">Your own Password Manager</p>

                <div className="text-black flex flex-col p-4 gap-8 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter Website URL"
                        className="rounded-full border border-green-500 w-full p-4 py-1"
                        type="text"
                        name="site"
                    />
                    <div className="flex flex-col md:flex w-full justify-between gap-8">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            className="rounded-full border border-green-500 w-full p-4 py-1"
                            type="text"
                            name="username"
                        />
                        <div className="relative flex w-full justify-between">
                            <input
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="rounded-full border border-green-500 w-full p-4 py-1"
                                type="password"
                                name="password"
                            />
                            <span
                                className="absolute right-[2px] top-[4px] cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                <img ref={ref} className="p-1" width={26} src="icons/eyecross.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={savePassword}
                        className="flex justify-center items-center bg-green-600 hover:bg-green-500 rounded-full px-4 py-2 w-fit"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        ></lord-icon>
                        Save 
                    </button>
                </div>

                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 ? (
                        <div>No passwords to show</div>
                    ) : (
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className="py-2 border border-white text-center ">
                                            <div className='flex items-center justify-center'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='lordiconcopy cursor-pointer size-6' onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="http://cdn.lordicon.com/iykgtsbt.json" trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 border border-white text-center "> <div className='flex items-center justify-center'><span>{item.username}</span>
                                            <div className=' lordiconcopy cursor-pointer size-6' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="http://cdn.lordicon.com/iykgtsbt.json" trigger="hover"
                                                ></lord-icon>
                                            </div>
                                        </div>
                                        </td>
                                        <td className="py-2 border border-white text-center w-32"> <div className='flex items-center justify-center'><span>{item.password}</span>
                                            <div className='lordiconcopy cursor-pointer size-6' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="http://cdn.lordicon.com/iykgtsbt.json" trigger="hover"
                                                ></lord-icon>
                                            </div>
                                        </div>
                                        </td>

                                        <td className="py-2 border border-white text-center "> <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                            src="https://cdn.lordicon.com/gwlusjdu.json"
                                            trigger="hover"
                                            style= {{"width":"25px","height":"25px"}}></lord-icon>
                                        </span>

                                        <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                            src="https://cdn.lordicon.com/skkahier.json"
                                            trigger="hover"
                                            style= {{"width":"25px","height":"25px"}}></lord-icon>
                                        </span>

                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
