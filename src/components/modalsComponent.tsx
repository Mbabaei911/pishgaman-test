import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/rootReducer"; // Adjust the import path as necessary
import { logout } from "../store/authSlice";
import RequestModal from "./requestModal";
import { resetPoints } from "../store/mapSlice";
export const Header: React.FC = () => {
  ///////////
  //states

  const { username } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  ///////////
  ///on exit button handler
  const onExitButtonClick = (): void => {
    dispatch(logout());
    dispatch(resetPoints());
  };

  ///////////
  //JSX

  return (
    <header className="header flex justify-between items-center bg-amber-20 mx-5 text-xl  fontMedium ">
      <p className="">{`${username} خوش آمدید.`}</p>
      <button
        className="exit-button text-white   border rounded-lg px-4 py-2 bg-red-400 hover:bg-red-600 cursor-pointer"
        onClick={onExitButtonClick}
      >
        خروج
      </button>
    </header>
  );
};

export const Card: React.FC<unknown> = () => {
  /////////////////
  ////states
  const pointSelections = useSelector((state: RootState) => state.map);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [requestStatus, setRequestStatus] = useState<number | null>(null);
  const [reqId, setReqId] = useState<number | null>(null);
  const [vehicleName, setVehicleName] = useState<string | null>(null);
  const { userToken } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [requestNo, setRequestNo] = useState<string | null>();


  //////////////
  ///handling close modal button
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRequestNo(null); // Clear the request number when closing
  };

  ////////////////
  ///search button click
  const onSearchClick = async (): Promise<void> => {
    try {
      if (searchTerm.length < 2) {
        setMessage("حداقل تعداد کاراکتر وارد شده باید 2 باشد.");
        setRequestStatus(0);
        return;
      }
      const response = await axios.get(
        `https://exam.pishgamanasia.com/webapi/Request/GetVehicleUsers?SearchTerm=${searchTerm}&UserToken=${userToken}`
      );
      // console.log(response.data);
      if (response.data.data.length>0) {
        
        setMessage(`${response.data.data[0]?.name} مورد نظر یافت شد! `);
        setReqId(response?.data?.data[0]?.id);
        setRequestStatus(response.data.status);
        setVehicleName(response.data.data[0]?.name);
        console.log(response.data.data[0]);
      }
      if (response.data.data.length === 0) {
        setMessage("ماشین آلات مورد نظر یافت نشد");
        setRequestStatus(0)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error message:", error.message);
        console.error("Error response:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  /////////////
  ///onRegisterButtonHandle
  const registerButtonClick = async (): Promise<void> => {
    try {
      // First API call
      const { data } = await axios.post(
        "https://exam.pishgamanasia.com/webapi/Request/SendRequest",
        {
          userToken,
          vehicleUserTypeId: reqId,
          source: `${pointSelections.points[0].lat},${pointSelections.points[0].lng}`,
          destination: `${pointSelections.points[1].lat},${pointSelections.points[1].lng}`,
        }
      );

      // Setting request number and open modal
      const requestNo = data.data.requestNo;
      setRequestNo(requestNo);
      setIsModalOpen(true);
      

      ////////making time of record
      const currentDateTime = new Date().toLocaleString("fa-IR", {
        timeZone: "Asia/Tehran",
      });
      // Second API call if requestNo is available
      if (requestNo) {
        await axios.post("http://localhost:8000/users", {
          userToken,
          source: `${pointSelections.points[0].lat},${pointSelections.points[0].lng}`,
          destination: `${pointSelections.points[1].lat},${pointSelections.points[1].lng}`,
          requestNumber: requestNo,
          timestamp: currentDateTime,
          vehicleName: vehicleName,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  /////////////
  ///creating register button 
  const renderingRegisterButton = () => {
    if (
      requestStatus === 1 &&
      pointSelections.points &&
      pointSelections.points.length === 2
    ) {
      return (
        <button
          onClick={registerButtonClick}
          className={`py-2 w-full bg-yellow-300 rounded-lg hover:bg-yellow-400 border border-gray-200 cursor-pointer `}
        >
          ثبت درخواست
        </button>
      );
    } else {
      return (
        <button
          disabled
          className={`py-2 w-full bg-gray-300 rounded-lg  border border-gray-200 `}
        >
          ثبت درخواست
        </button>
      );
    }
  };

  ////////////////
  ////JSX
  return (
    <>
      <div className="w-[550px] shadow-lg bg-white rounded-lg fontMedium  border border-gray-300 ">
        <div className="flex flex-col justify-start p-4 ">
          <div className="flex p-3 border-b border-gray-300 items-center ">
            <FaMapMarkerAlt className="text-red-500 text-2xl" />
            <h2 className="pt-2 text-red-500 mx-2" id="">
              {pointSelections.points?.length > 0
                ? `${pointSelections.points[0].lng} , ${pointSelections.points[0].lat}`
                : "مبدا را انتخاب کنید"}
            </h2>
          </div>

          <div className="flex p-3 border-b border-gray-300 items-center">
            <FaMapMarkerAlt className="text-green-500 text-2xl" />
            <h2 className="pt-2 text-green-500 mx-2" id="destination">
              {pointSelections.points?.length > 1
                ? `${pointSelections.points[1].lng} , ${pointSelections.points[1].lat}`
                : "مقصد را انتخاب کنید"}
            </h2>
          </div>

          <div className="flex mb-3 mt-2 ">
            <input
              type="text"
              className="rounded-lg border border-gray-300 p-2 flex-grow outline-blue-200 text-gray-600"
              placeholder=" نوع ماشین آلات (سواری،کامیون یا کامیونت)"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (searchTerm.length < 2) {
                  setRequestStatus(0);
                }
                console.log(searchTerm);
              }}
            />
            <button
              className=" text-black rounded-lg p-3 flex items-center absolute left-6 cursor-pointer"
              type="button"
              onClick={onSearchClick}
            >
              <FaSearch />
            </button>
          </div>
          <div>
            <p className="text-red-400 text-sm mb-2">
              {pointSelections.points.length === 2 && message}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center ">
            {renderingRegisterButton()}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <RequestModal
          isOpen
          onClose={handleCloseModal}
          requestNo={requestNo ?? null}
        />
      )}
    </>
  );
};
