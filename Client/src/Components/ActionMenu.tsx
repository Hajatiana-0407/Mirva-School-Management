import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";
import { useHashPermission } from "../Hooks/useHashPermission";

interface Action {
  label: string;
  onClick: () => void;
  danger?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  type?: string
}

interface Props {
  actions: Action[];
}




const ActionMenu = ({ actions }: Props) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const permission = useHashPermission();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  // Toggle menu et calcule la position du bouton
  const toggleMenu = () => {
    setOpen(!open);
  };
  // Fermer si clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // Ajuste la position après ouverture pour largeur dynamique
  useEffect(() => {
    if (open && buttonRef.current && menuRef.current) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();

      setPosition({
        top: btnRect.bottom + window.scrollY - btnRect.height + 5,
        left: btnRect.right + window.scrollX - menuRect.width - btnRect.width - 15,
      });
    }
  }, [open]);

  return (
    <>
      {/* Bouton */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="p-2 rounded  bg-white 
                   border border-gray-200 hover:border-indigo-400 
                   text-gray-500 hover:text-indigo-600 
                   transition-all duration-200"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {/* Portal pour afficher le menu */}
      {open &&
        createPortal(
          <div
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              zIndex: 9999,
            }}
            className=" bg-white border border-blue-300/60 rounded rounded-tr-none
                        animate-fade-in"
            ref={menuRef}
          >
            <ul className=" p-1 space-y-1">
              {actions.map((action, i) => {

                // ? Pas de permission de modification
                if (action.type === 'update' && !permission.update) return;
                // ! Pas de permission de suppression 
                if (action.type === 'delete' && !permission.delete) return;
                return (
                  <li key={i}>
                    <button
                      onClick={() => {
                        action.onClick();
                        setOpen(false);
                      }}
                      type="button"
                      className={`w-full border border-gray-100 rounded text-left px-4 py-2 text-md hover:bg-gray-100 flex items-center gap-2 text-ellipsis overflow-hidden whitespace-nowrap  text-gray-600`}
                    >
                      {action.icon && <action.icon className={`w-5 h-5 ${action.color}`} />}
                      {action.label}
                    </button>
                  </li>
                )
              })}
            </ul>


            <div className="absolute -top-[2px] left-full w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-l-[15px] border-l-blue-200"></div>
          </div>,
          document.body
        )}
    </>
  );
}


export default ActionMenu
