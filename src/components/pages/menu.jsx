import { useEffect, useState } from "react";

export const Menu = () => {
  const [menuData, setMenuData] = useState({});
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch("https://soal.staging.id/api/menu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ show_all: "1" }),
        });

        const data = await response.json();
        // console.log('Response Data Menu', data)
        
        if (response.ok) {
          const formatted = {};
          data.result.categories.forEach((cat) => {
            formatted[cat.category_name] = cat.menu;
          });
          setMenuData(formatted);
          setActiveTab(data.result.categories[0]?.category_name || "");
        } else {
          console.error("Failed:", data.message);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  if (!activeTab)
    return (
      <p className="p-4 h-screen flex justify-center items-center">
        Loading...
      </p>
    );

  return (
    <div className="w-full max-w-md mx-auto bg-white text-sm font-sans">
      <div className="text-center font-bold text-lg py-5">MENU</div>

      <div className="flex overflow-x-auto border-b border-gray-200">
        {Object.keys(menuData).map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 font-medium cursor-pointer ${
              activeTab === tab
                ? "border-b-2 border-[#1b1b1b] text-[#1b1b1b]"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        <h2 className="font-semibold text-base">{activeTab}</h2>
        <div className="space-y-4">
          {menuData[activeTab]?.length === 0 ? (
            <p className="text-gray-400">No items in this category.</p>
          ) : (
            menuData[activeTab]?.map((item, index) => {
              const isLast = index === menuData[activeTab].length - 1;

              return (
                <div
                  key={index}
                  className={`flex space-x-3 pb-3 ${
                    isLast ? "" : "border-dashed border-b border-gray-400"
                  }`}
                >
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center font-semibold">
                      <span>{item.name}</span>
                      <span>Rp {item.price.toLocaleString()}</span>
                    </div>
                    <p className="text-gray-600 max-w-[230px] text-xs line-clamp-4">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
