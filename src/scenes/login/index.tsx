import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAdmin } from "../../features/context/contextSlice";
import { loginUser } from "../../features/user/userSlice";
import { RootState, useAppDispatch } from "../../store";

type Props = {};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const { isUserLoggedIn, isUserLoading } = useSelector(
    (state: RootState) => state.user
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(setIsAdmin(true));
      navigate("/");
    }
  }, [isUserLoggedIn, dispatch, navigate]);

  //we will deal with login here later
  const handleLogin = async () => {
    await dispatch(loginUser(loginData));
    setLoginData({
      userName: "",
      password: "",
    });
  };

  return (
    <div className="bg-[#e9ecef] flex items-center justify-center w-full h-screen">
      <div className="w-[500px] px-4">
        <div className="border-2 w-full  rounded-lg flex flex-col gap-8 justify-between bg-white ">
          {/* topborder */}
          <div className="h-[2.5px]  rounded-md mt-[-1px]  bg-[#017bfe] "></div>
          {/* inputs */}
          <div className="flex flex-col ">
            <div className="py-4 w-full  flex flex-row items-center justify-between ">
              <label className="px-8 my-auto">Kullanici Adi:</label>
              <input
                type="text"
                className="border-2 border-gray-400 rounded-md mx-4 py-2  w-3/5 my-auto"
                name="userName"
                value={loginData.userName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="py-4 w-full  flex flex-row items-center justify-between ">
              <label className="px-8 my-auto">Sifre:</label>
              <input
                type="password"
                className="border-2 border-gray-400 rounded-md mx-4 py-2  w-3/5 my-auto"
                name="password"
                value={loginData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>

          {/* buttons */}
          <button
            className="bg-[#017bfe] text-white rounded-md py-2 px-4 w-1/2 mx-auto my-2 cursor-pointer"
            onClick={handleLogin}
          >
            Giris Yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
