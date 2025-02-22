"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedList } from "../magicui/animated-list";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

function getRandomNotification(): Item {
  const names = [
    "Cash Out Successful!",
    "Big Win!",
    "Lucky Strike!",
    "Bonus Awarded!",
    "Jackpot Winner!",
    "Spin & Win!",
    "Fortune Favored!",
    "Daily Reward!",
    "Mega Win!",
    "Payout Complete!",
  ];

  const descriptions = [
    "Won $69.87 from mines game!",
    "Scored $120.50 in blackjack!",
    "Bagged $55.32 in slots!",
    "Earned $200.00 in poker!",
    "Claimed $99.99 from roulette!",
    "Secured $150.75 in baccarat!",
    "Pocketed $75.60 from dice!",
    "Gained $80.45 in craps!",
    "Collected $250.00 in bingo!",
    "Achieved $40.20 from keno!",
  ];

  const times = [
    "Just now",
    "5m ago",
    "10m ago",
    "15m ago",
    "30m ago",
    "1h ago",
    "2h ago",
    "Yesterday",
    "2 days ago",
    "Last week",
  ];

  const icons = ["💸", "🎉", "🏆", "💰", "🎁", "🎯", "🎲", "🎰", "🃏", "🎮"];
  const colors = [
    "#00C9A7",
    "#FF5733",
    "#FFC300",
    "#DAF7A6",
    "#C70039",
    "#007BFF",
    "#28A745",
    "#FF8C00",
    "#9400D3",
    "#E91E63",
  ];

  return {
    name: names[Math.floor(Math.random() * names.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    time: times[Math.floor(Math.random() * times.length)],
    icon: icons[Math.floor(Math.random() * icons.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}

export function FeatureList({ className }: { className?: string }) {
  const [notifications, setNotifications] = useState<Item[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side render and generate random notifications
    setIsClient(true);
    const randomNotifications = Array.from(
      { length: 20 },
      getRandomNotification,
    );
    setNotifications(randomNotifications);
  }, []);

  // Placeholder content for server-side render
  const placeholderNotifications = Array.from({ length: 20 }, () => ({
    name: "Loading...",
    description: "Please wait while we fetch the latest notifications.",
    icon: "🔄",
    color: "#D3D3D3",
    time: "Loading...",
  }));

  return (
    <div
      className={cn(
        "absolute right-0 top-10 origin-top scale-75 rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-90",
        className,
      )}
    >
      <AnimatedList>
        {(isClient ? notifications : placeholderNotifications).map(
          (item, idx) => (
            <FeatutesNotification {...item} key={idx} />
          ),
        )}
      </AnimatedList>
    </div>
  );
}

const FeatutesNotification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};