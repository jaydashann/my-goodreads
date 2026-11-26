import { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaBookOpenReader } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { PiBell } from "react-icons/pi";
import { SlArrowDown } from "react-icons/sl";
import { TbLayoutCollage } from "react-icons/tb";
import { VscDiffAdded, VscHome } from "react-icons/vsc";
import FilterBar from "../components/filter-bar";
import SearchFilter from "../components/search-filter";
import AddBookBar from "../components/sidebars/add-book-bar";
import MessageBar from "../components/sidebars/message-bar";
import SettingsBar from "../components/sidebars/settings-bar";
import UpdatesBar from "../components/sidebars/updates-bar";
import Tiles from "../components/tiles";
import { IconLabel } from "../components/ui/hover-label";

export default function Dashboard() {
  const [bookPanel, setBookPanel] = useState(false);
  const [settingsPanel, setSettingsPanel] = useState(false);
  const [updatesPanel, setUpdatesPanel] = useState(false);
  const [messagePanel, setMessagePanel] = useState(false);

  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col justify-between w-18 shrink-0 h-full bg-background border-r border-sideborder">
        <div className="flex flex-col items-center">
          <div className="text-3xl text-secondary mt-6 m-4">
            <IconLabel
              icon={FaBookOpenReader}
              label="Home"
              variant={"side"}
              textVariant={"side"}
            />
          </div>
          <div className="text-3xl m-5">
            <IconLabel
              icon={VscHome}
              label="Home"
              variant={"side"}
              textVariant={"side"}
            />
          </div>
          <div className="text-3xl m-3">
            <IconLabel
              icon={TbLayoutCollage}
              label="Your books"
              variant={"side"}
              textVariant={"side"}
            />
          </div>
          <div className="text-3xl m-6">
            <IconLabel
              icon={VscDiffAdded}
              label="Create"
              onClick={() => setBookPanel((curr) => !curr)}
              variant={"side"}
              textVariant={"side"}
            />
          </div>
          <div className="text-3xl m-2">
            <IconLabel
              icon={PiBell}
              label="Updates"
              onClick={() => setUpdatesPanel((curr) => !curr)}
              variant={"side"}
              textVariant={"side"}
            />
          </div>
          <div className="text-3xl m-6">
            <IconLabel
              icon={AiOutlineMessage}
              label="Messages"
              onClick={() => setMessagePanel((curr) => !curr)}
              variant={"side"}
              textVariant={"side"}
            />
          </div>
        </div>
        <div className="flex flex-col items-center m-5">
          <div className="text-3xl">
            <IconLabel
              icon={IoSettingsOutline}
              label="Settings & Support"
              variant={"side"}
              textVariant={"side"}
              onClick={() => setSettingsPanel((curr) => !curr)}
            />
          </div>
        </div>
      </div>

      <AddBookBar open={bookPanel} onClose={() => setBookPanel(false)} />
      <SettingsBar
        open={settingsPanel}
        onClose={() => setSettingsPanel(false)}
      />
      <UpdatesBar open={updatesPanel} onClose={() => setUpdatesPanel(false)} />
      <MessageBar open={messagePanel} onClose={() => setMessagePanel(false)} />

      <div className="h-full min-w-0 flex-1 overflow-y-auto">
        <div className="flex w-full items-center gap-3 p-4">
          <div className="min-w-0 flex-1">
            <SearchFilter />
          </div>
          <IconLabel
            icon={CgProfile}
            label="Your Profile"
            variant={"profile"}
            textVariant={"profile"}
          />
          <button className="rounded transition-all hover:bg-grayscale/10 p-1">
            {/* <AccountsIcon icon={IoIosArrowDown} label="Accounts" /> */}
            <IconLabel
              icon={SlArrowDown}
              label="Accounts"
              variant={"account"}
              textVariant={"account"}
            />
          </button>
        </div>
        <div className="mt-3 mb-5 ml-8">
          <FilterBar />
        </div>
        <div className="px-4 pb-4">
          <Tiles />
        </div>
      </div>
    </div>
  );
}
