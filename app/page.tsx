"use client";

import { IoAddSharp } from "react-icons/io5";
import FormModal from "@/components/FormModal";
import { useState } from "react";
import MessageTable from "@/components/MessageTable";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-dvh w-full bg-gradient-to-br from-blue-500 to-purple-500">
      <div className="flex justify-center p-5">
        <div className="font-Poppins inline-flex justify-center font-medium text-black">
          <h2 className="rounded-l-2xl bg-white px-4 py-2">
            Send Your Message Now!
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex cursor-pointer items-center rounded-r-2xl bg-sky-400 px-4 py-2"
          >
            New
            <IoAddSharp className="ml-1" />
          </button>
        </div>
      </div>
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      ></FormModal>
      <MessageTable />
    </div>
  );
}
