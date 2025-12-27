import React from "react";
import { Sparkles } from "lucide-react";
import { TrendingUp } from "lucide-react";

const Header1 = () => {

  let progress=50
  let activeTodos=4
  return (
    <>
      <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          {/*left side */}

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center rounded-2xl shadow-lg ">
                <Sparkles className="text-white" size={24} />
              </div>

              <div className="absolute rounded-full animate-ping -top-1 -right-1 bg-emerald-400 w-4 h-4">
                {" "}
              </div>
            </div>
            <div>
              <h1 className="text-3xl text-white tracking-tight font-black">
                TaskFlow
              </h1>
              <p className="text-purple-300 font-medium">
                Productivity Reimagined
              </p>
            </div>
          </div>

          {/* right side */}

          <div className="flex items-center gap-2 px-4 py-2 bg-linear-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full border border-violet-400/30">
            <TrendingUp size={16} className="text-green-700" />
            <span className="text-white font-bold text-sm">{activeTodos} Active</span>
          </div>
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70 text-xs font-semibold">Progress</span>
            <span className="text-white font-bold text-sm">{Math.round(progress)}%</span>
          </div>


          <div className="relative bg-white/10 h-2  overflow-hidden  rounded-full w-full">
          <div className="absolute inset-0  bg-linear-to-br from-emrals-400 
          via-teal-400 to-cyan-400 transition-all duration-700 ease-out shadow-lg" style={{width:`${progress}%`}}>
          </div>

          <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/30 to-transparent aimate-shimmer">

          </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default Header1;
