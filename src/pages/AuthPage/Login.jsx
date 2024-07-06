import React, {useEffect, useState} from 'react';
import {FcGoogle} from "react-icons/fc";
import {FaXTwitter} from "react-icons/fa6";
import {FaGithub} from "react-icons/fa";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {signInWithEmail} from "../../controller/supabase.js";

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state || {}
  const {signup} = state

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  useEffect(() => {

    if (signup) {
      document.getElementById("modal").showModal()
      setTimeout(() => {
        document.getElementById("modal").close()
      }, 10000)
    }

  }, [signup]);

  const handleSubmit = async () => {
    try {
      document.getElementById("modal-loading").showModal()
      const response = await signInWithEmail(email, password)

      if(response.user.user_metadata) {
        navigate(`/`)
        sessionStorage.setItem("user", JSON.stringify(response.user.user_metadata))
      }

    } catch (error) {
      document.getElementById("modal-loading").close()

      document.getElementById("modal-check").showModal()
      setTimeout(() => {
        document.getElementById("modal-check").close()
      }, 5000)

      console.error(`login page: ${error}`)
    } finally {
      document.getElementById("modal-loading").close()
    }
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4 font-poppins">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">

        {/* Modal Start */}
        <div>
          <dialog id="modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Account Created Successfully!</h3>
              <p className="py-4">Your account has been successfully created. You can now log in.</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        {/* Modal End */}

        {/* Modal loading Start */}
        <div>
          <dialog id="modal-loading" className="modal">
            <div className="modal-box flex justify-center ">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          </dialog>
        </div>
        {/* Modal loading End */}

        {/* Modal check Start */}
        <div>
          <dialog id="modal-check" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Opps, something wrong!.</h3>
              <p className="py-4">Opps, check your email or password.</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        {/* Modal check End */}

        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
            <p className="">Don&apos;t have an account? <Link to={"/register"}
                                                              className="font-medium text-indigo-600 hover:text-indigo-500">Sign
              up</Link></p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
          <div className="grid grid-cols-3 gap-x-3">
            <button
              className="btn bg-white flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
              <FcGoogle size={25}/>
            </button>
            <button
              className="btn bg-white flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
              <FaXTwitter size={25}/>
            </button>
            <button
              className="btn bg-white flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
              <FaGithub size={25}/>
            </button>
          </div>
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">Or continue
              with</p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
          >
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
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </form>
        </div>
        <div className="text-center">
          <a href="javascript:void(0)" className="hover:text-indigo-600">Forgot password?</a>
        </div>
      </div>
    </main>
  );
}

export default Login;