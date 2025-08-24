import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [newAspiration, setNewAspiration] = useState({ name: "", message: "" });
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const className = clsx(
    "rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 font-Nunito",
    { "opacity-50 cursor-progress": isPending },
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending) return;

    const lastSent = localStorage.getItem("lastSentTime");
    const now = Date.now();

    if (lastSent && now - parseInt(lastSent) < 60 * 60 * 1000) {
      setMessage("Kamu hanya bisa mengirim sekali tiap 1 jam.");
      return;
    }

    try {
      setIsPending(true);

      const { error } = await supabase.from("aspiration").insert(newAspiration);

      if (error) throw error;

      localStorage.setItem("lastSentTime", now.toString());

      setMessage("Pesan berhasil dikirim!");
      onClose();
      setNewAspiration({ name: "", message: "" });
    } catch (err) {
      isOpen = false;
      console.error(err);
      setMessage("Gagal mengirim pesan.");
    } finally {
      isOpen = false;
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setMessage("");
      setNewAspiration({ name: "", message: "" });
    }
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="font-Poppins w-96 rounded-2xl bg-white p-6 text-cyan-700 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-sky-400">Add Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="Name" className="ml-1">
            Name
          </label>
          <input
            type="text"
            placeholder={`Input your name or empty for Anonymous`}
            onChange={(e) =>
              setNewAspiration((prev) => ({ ...prev, name: e.target.value }))
            }
            className="font-Nunito w-full rounded-lg border p-2"
          />
          <label htmlFor="Message" className="ml-1">
            Message
          </label>
          <textarea
            id="Message"
            placeholder={`Type Your Message Here!`}
            onChange={(e) =>
              setNewAspiration((prev) => ({ ...prev, message: e.target.value }))
            }
            className="w-full resize-y overflow-y-auto rounded-lg border p-2 break-words"
            rows={4}
            required
          />
          {message && (
            <p className="text-center text-sm text-red-600">{message}</p>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              disabled={isPending}
              onClick={onClose}
              className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button type="submit" className={className}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
