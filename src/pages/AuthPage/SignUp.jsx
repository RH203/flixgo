import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import {FaXTwitter} from "react-icons/fa6";
import {FaGithub} from "react-icons/fa";
import {signUpWithEmail} from "../../controller/supabase.js";
import {toast, ToastContainer} from "react-toastify";

function SignUp() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")


  const notifyError = () =>

    toast.error("Opps check again your email", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = async () => {
    try {
      document.getElementById("modal").showModal()
      const response = await signUpWithEmail(email, password, firstname, lastname)

     console.log(`SignUP: ${response}`)
      navigate("/login", {state: {signup: true}})
    } catch (error) {
      document.getElementById("modal").close()
      notifyError()
      console.error(`SignUp page: ${error}`)
    } finally {
      document.getElementById("modal").close()
    }
  }


  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4 font-poppins">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">

        <ToastContainer position="top-center" theme="light"/>

        <div>
          <dialog id="modal" className="modal">
            <div className="flex justify-center modal-box">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          </dialog>
        </div>

        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Create an account</h3>
            <p className="">Already have an account? <Link to={"/login"}
                                                           className="font-medium text-indigo-600 hover:text-indigo-500">Sign Insupa
            </Link>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
          <form
            onSubmit={(event) => event.preventDefault()}
            className="space-y-5"

          >
            <div className={"grid grid-cols-2 gap-x-2"}>
              <div>
                <label className="font-medium">
                  Firstname
                </label>
                <input
                  type="text"
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  value={firstname}
                  onChange={(event) => setFirstname(event.target.value)}
                />
              </div>

              <div>
                <label className="font-medium">
                  Lastname<span className={"textarea-xs font-normal text-indigo-400"}>optional</span>
                </label>
                <input
                  type="text"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  value={lastname}
                  onChange={(event) => setLastname(event.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="font-medium">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
              className="btn w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              onClick={handleSubmit}
            >
              Create account
            </button>
          </form>

          <div className="divider">Or continue with</div>

          <div className="grid grid-cols-3 gap-x-3">
            <button
              className="btn bg-white w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
              <FcGoogle size={25}/>
            </button>
            <button
              className="btn bg-white w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
              <FaXTwitter size={25}/>
            </button>
            <button
              className="btn bg-white w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
              <FaGithub size={25}/>
            </button>
          </div>
        </div>


      </div>
    </main>
  )
    ;
}

export default SignUp;