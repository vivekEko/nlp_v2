import React, { useRef, useState } from "react";

// firebase
import { auth, provider } from "../firebase/firebase_setup";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// icons
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

// assets
import logo from "../assets/global/header/company_logo.svg";
import google_logo from "../assets/login/google-logo.png";
import { useNavigate } from "react-router-dom";
// loader
import { Oval } from "react-loader-spinner";

const Login = () => {
  // local variables
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loaderStatus, setLoaderStatus] = useState(false);

  const signInWithGoogle = async () => {
    setLoaderStatus(true);
    try {
      await signInWithPopup(auth, provider)?.then((res) => {
        if (res) {
          navigate("/admin/dashboard");
          console.log(res);
          setLoaderStatus(false);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="area ">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <div className="fixed inset-0 h-screen flex justify-center items-center p-5">
        <div className="bg-white p-5 rounded-xl w-full max-w-[350px] shadow-2xl border border-[#fefefe]">
          <div className="flex justify-center items-center gap-5 flex-col">
            <img src={logo} alt="" className="w-[100px] mb-5" />
            {/* <h1 className="text-lg tracking-wider ">Admin Panel</h1> */}
          </div>

          <form
            onSubmit={async (e) => {
              e?.preventDefault();
              setLoaderStatus(true);

              if (
                emailRef?.current?.value?.length > 0 &&
                passwordRef?.current?.value?.length > 0
              ) {
                try {
                  await signInWithEmailAndPassword(
                    auth,
                    emailRef?.current?.value,
                    passwordRef?.current?.value
                  )?.then((res) => {
                    if (res) {
                      console.log(res);
                      navigate("/admin/dashboard");
                      setLoaderStatus(false);
                    }
                  });
                } catch (error) {
                  console.log(error.message);
                }
              } else {
                console.log("No calls");
              }
            }}
          >
            {/* email */}
            <input
              ref={emailRef}
              autoFocus
              type="text"
              className="p-3 mt-5 block bg-gray-100 w-full rounded-lg outline-[#038dfe86]"
              placeholder="Username"
              onKeyDown={(e) => {
                if (e.code == "ArrowDown") {
                  passwordRef.current.focus();
                }
              }}
            />
            {/* password */}
            <div className=" rounded-lg mt-5 relative ">
              <input
                ref={passwordRef}
                type={passwordVisibility ? "text" : "password"}
                className="p-3  block bg-gray-100 w-full rounded-lg outline-[#038dfe86]"
                placeholder="Password"
                onKeyDown={(e) => {
                  if (e.code == "ArrowUp") {
                    emailRef.current.focus();
                  }
                }}
              />
              {/* visibility toggle */}
              <div
                onClick={() => {
                  setPasswordVisibility(!passwordVisibility);
                  passwordRef.current.focus();
                }}
                className="absolute right-1 top-1 bottom-1  p-2 rounded-lg bg-gray-100 text-gray-400 outline-[#038dfe86] "
              >
                {passwordVisibility ? (
                  <VisibilityOffRoundedIcon />
                ) : (
                  <RemoveRedEyeRoundedIcon />
                )}
              </div>
            </div>
            {/* submit button */}
            <button
              type="submit"
              className="py-3 rounded-xl bg-[#038dfe] text-white w-full text-center mt-5 transition-all active:scale-95 bg-opacity-90 hover:bg-opacity-100 flex justify-center items-center"
            >
              {loaderStatus ? (
                <Oval
                  height={20}
                  width={20}
                  color="#ffff"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#ffff"
                  strokeWidth={5}
                  strokeWidthSecondary={5}
                />
              ) : (
                <h1>Login</h1>
              )}
            </button>
          </form>

          {/* auth providers */}
          <div>
            <div className="flex items-center gap-5 my-5">
              <div className="bg-gray-300 rounded-lg h-[1px] w-full"></div>
              <span>or</span>
              <div className="bg-gray-300 rounded-lg h-[1px] w-full"></div>
            </div>

            <div className="flex justify-center items-center">
              <button onClick={signInWithGoogle}>
                <img
                  src={google_logo}
                  alt="google auth"
                  className="w-[30px] aspect-square"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
