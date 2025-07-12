"use client";
import { useState, Fragment } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatInterface from "./ChatInterface";
import { Transition } from "@headlessui/react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition-all ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition-opacity ease-in duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="mb-2 max-w-92 overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-2xl ">
          <div className="flex items-center justify-between border-b bg-gray-500 p-3 text-white">
            <h3 className="text-md font-bold">Trợ lý AI</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 transition-colors hover:bg-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="h-[60vh] max-h-[550px]">
            <ChatInterface />
          </div>
        </div>
      </Transition>

      <Transition
        show={!isOpen}
        as={Fragment}
        enter="transition-all ease-out duration-300 delay-300"
        enterFrom="opacity-0 scale-75"
        enterTo="opacity-100 scale-100"
        leave="transition-all ease-in duration-300"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-75"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500  text-white shadow-lg transition-transform hover:scale-110 animate-bounce cursor-pointer"
        >
          <MessageCircle size={24} />
        </button>
      </Transition>
    </div>
  );
}
