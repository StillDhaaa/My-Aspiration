import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { formatTime } from "@/lib/utils";

interface Aspiration {
  id: number;
  created_at: string;
  name: string;
  message: string;
}

export default function MessageTable() {
  const [aspiration, setAspiration] = useState<Aspiration[]>([]);

  const fetchTask = async () => {
    const { error, data } = await supabase
      .from("aspiration")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      console.error("Error reading task: ", error.message);
      return;
    }
    setAspiration(data);
  };

  useEffect(() => {
    fetchTask();
  }, []);
  console.log(aspiration);

  return (
    <div className="font-Poppins relative mx-auto w-5/6 max-w-3xl rounded-2xl bg-white/75 pb-6">
      <h2 className="pt-3 text-center font-semibold text-cyan-600">MESSAGE</h2>

      {/* Container scroll */}
      <div className="relative flex max-h-[70vh] w-full flex-col items-center gap-2 overflow-y-auto p-3">
        {aspiration.map((item) => (
          <div
            key={item.id}
            className="relative flex w-11/12 flex-col gap-1 rounded-2xl border-[1.5px] border-black bg-white px-6 py-3 pb-6 text-black"
          >
            <div className="text-[25px] break-words whitespace-pre-wrap">
              {item.name ? item.name : "Anonymous"}
            </div>
            <div className="font-Nunito -mt-2 ml-1 pb-2 break-words whitespace-pre-wrap">
              {item.message}
            </div>
            <div className="font-Nunito absolute right-5 bottom-0 max-md:text-[10px]">
              {formatTime(item.created_at)}
            </div>
          </div>
        ))}

        {/* Fade di bawah */}
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-12 rounded-b-2xl bg-gradient-to-t from-white/95 to-transparent" />
    </div>
  );
}
