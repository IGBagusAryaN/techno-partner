import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Navbar } from "../bar/navbar";

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const token = localStorage.getItem("authToken");

  const fetchData = async () => {
    try {
      const res = await fetch("https://soal.staging.id/api/home", {
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();
    //   console.log("Response User Data", data);

      if (res.ok) {
        setUserInfo(data.result);
      } else {
        console.error("Gagal ambil data:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => {
        const total = userInfo?.banner?.length || 1;
        return (prev + 1) % total;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [userInfo]);

  useEffect(() => {
    const handleRefresh = () => {
      if (window.scrollY === 0) {
        console.log("Refreshing user data...");
        fetchData();
      }
    };

    window.addEventListener("touchend", handleRefresh);
    return () => window.removeEventListener("touchend", handleRefresh);
  }, []);

  if (!userInfo)
    return (
      <p className="p-4 h-screen flex justify-center items-center">
        Loading...
      </p>
    );

  return (
    <div className="space-y-4 bg-white min-h-screen">
      <Navbar />
      <div className="p-4 bg-[url('/src/assets/pattern-BG.jpg')] ">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <p className="text-sm text-gray-500 font-semibold">
            {userInfo.greeting}
          </p>
          <h2 className="text-lg font-bold">{userInfo.name}</h2>

          <div className="flex items-center mt-3">
            <div
              className="p-3 rounded-full shadow-sm cursor-pointer"
              onClick={() => setIsQrOpen(true)}
            >
              <img src={userInfo.qrcode} alt="QR Code" width={45} />
            </div>
            <div className="ml-4 space-y-1 w-full">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Saldo</span>
                <span className="text-sm font-semibold">
                  Rp {userInfo.saldo.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Points</span>
                <span className="text-sm text-green-500">{userInfo.point}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <img
          src={userInfo.banner[currentBanner]}
          alt="Banner"
          className="w-full h-40 object-cover transition duration-500"
        />

        <div className="flex justify-between items-center px-4 py-2 bg-white">
          <div className="flex space-x-2">
            {userInfo.banner.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentBanner ? "bg-emerald-500" : "bg-black/70"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-emerald-500 text-sm font-medium">
              View All
            </span>
            <span className="text-emerald-500">&gt;</span>
          </div>
        </div>
      </div>

      <Dialog
        open={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-white">
          <button
            className="absolute top-8 right-8 text-blue-500"
            onClick={() => setIsQrOpen(false)}
          >
            <img
              src="/src/assets/close-x.svg"
              alt="close"
              className="w-5 h-5"
            />
          </button>
          <DialogPanel className="rounded-xl p-6 flex flex-col justify-center items-center mt-40 gap-14">
            <DialogTitle className="font-semibold">
              Show the QR Code below to the cashier
            </DialogTitle>
            <img src={userInfo.qrcode} alt="QR Code" />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
