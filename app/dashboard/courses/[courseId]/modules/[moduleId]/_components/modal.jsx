"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";


const Modal = ({ children }) => {
    const router = useRouter();
    const modalRef = useRef(null);

    useEffect(() => {
        if (!modalRef.current?.open) {
            modalRef.current?.showModal();
        }
    }, []);

    function onHide() {
        router.back();
    }

    return createPortal(
        <dialog
            ref={modalRef}
            onClose={onHide}
            className="shadow-[#ff4953] shadow-md border border-[#9cb2db] flex flex-col p-2 rounded-md min-w-[500px] w-[auto] min-h-[220px]"
        >
            <span onClick={onHide}
                className="flex justify-end cursor-pointer">
                <X />
            </span>
            {children}
        </dialog>
        ,
        document.getElementById("modal-root-id")
    );
};

export default Modal;
