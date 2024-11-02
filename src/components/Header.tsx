import { FaDice, FaGithub } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";

function Header() {
  return (
    <header className="w-full h-20 border-b border-gray-200">
      <div className="w-full max-w-[81.25rem] h-full mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <img src="/yomitai-logo.png" alt="logo" className="h-8 w-auto" />
          <h1 className="font-montserrat font-bold text-xl ml-3">Yomitai</h1>
        </div>

        <nav className="flex space-x-4 list-none">
          <li>
            <span>
              <a href="">
                <div className="h-8 w-8 bg-zinc-500 hover:bg-zinc-800 rounded-full flex items-center justify-center">
                  <MdLightMode className="text-neutral-50 text-xl" />
                </div>
              </a>
            </span>
          </li>
          <li>
            <span>
              <a href="">
                <div className="h-8 w-8 bg-zinc-500 hover:bg-zinc-800 rounded-full flex items-center justify-center">
                  <FaDice className="text-neutral-50 text-xl" />
                </div>
              </a>
            </span>
          </li>
          <li>
            <div className="h-full w-px bg-gray-200"></div>
          </li>
          <li>
            <span>
              <a href="https://github.com/pmrna/Yomitai">
                <div className="h-8 w-8 bg-zinc-500 hover:bg-zinc-800 rounded-full flex items-center justify-center">
                  <FaGithub className="text-neutral-50 text-xl" />
                </div>
              </a>
            </span>
          </li>
        </nav>
      </div>
    </header>
  );
}

export default Header;
