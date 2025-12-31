import React from "react";
import { Plus } from "lucide-react";

const Input = ({value,onChange,onAdd,onKeyPress}) => {
  // let value;
  // let onChange;
  // let onAdd;
  // let onKeyPress;

  return (
    <div className="p-3 backdrop-blur-2xl bg-white/5 rounded-2xl border border-white/10 mb-4 hover:bg-white/10 transition-all duration-300">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyPress}
          placeholder="What's on your mind ?"
          className="bg-white/20 px-4 py-3 flex-1 text-white placeholder-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 font-medium text-sm border border-white/5 backdrop-blur-2xl transition-all"
        />
        <button
          onClick={onAdd}
          className="flex items-center justify-center px-6 py-3 bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl text-white hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 gap-2 cursor-pointer font-bold text-sm hover:scale-105 active:scale-105 "
        >
          Add
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default Input;
