"use client";
import React from "react";


const matches = [
  {
    competition: "Champions League",
    status: "FT",
    homeTeam: {
      abbreviation: "FEY",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-01-22%20at%2023.37.20-lgquvYhCZfxKHptyE8rc5ULJ7krbO5.png",
      score: 3,
    },
    awayTeam: {
      abbreviation: "FCB",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-01-22%20at%2023.37.20-lgquvYhCZfxKHptyE8rc5ULJ7krbO5.png",
      score: 0,
    },
  },
  {
    competition: "Champions League",
    status: "FT",
    homeTeam: {
      abbreviation: "MIL",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-01-22%20at%2023.37.20-lgquvYhCZfxKHptyE8rc5ULJ7krbO5.png",
      score: 1,
    },
    awayTeam: {
      abbreviation: "GIR",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-01-22%20at%2023.37.20-lgquvYhCZfxKHptyE8rc5ULJ7krbO5.png",
      score: 0,
    },
  },
  {
    competition: "Champions League",
    status: "FT",
    homeTeam: {
      abbreviation: "PSG",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-01-22%20at%2023.37.20-lgquvYhCZfxKHptyE8rc5ULJ7krbO5.png",
      score: 4,
    },
    awayTeam: {
      abbreviation: "MCI",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screen%20Shot%202025-01-22%20at%2023.37.20-lgquvYhCZfxKHptyE8rc5ULJ7krbO5.png",
      score: 2,
    },
  },
];

export default function LiveMatch() {
  return (
    <div className="w-full bg-zinc-900 p-4">
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-full space-x-4 p-4">
          {matches.map((match, index) => (
            <div
              key={index}
              className="inline-flex min-w-[200px] flex-col space-y-3 rounded-lg bg-zinc-800/50 p-4"
            >
              <div className="flex items-center justify-between text-sm text-zinc-400">
                <span>{match.competition}</span>
                <span>{match.status}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 overflow-hidden rounded-full">
                      <Image
                        src={match.homeTeam.logo || "/placeholder.svg"}
                        alt={match.homeTeam.abbreviation}
                        width={24}
                        height={24}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {match.homeTeam.abbreviation}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-white">
                    {match.homeTeam.score}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 overflow-hidden rounded-full">
                      <Image
                        src={match.awayTeam.logo || "/placeholder.svg"}
                        alt={match.awayTeam.abbreviation}
                        width={24}
                        height={24}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {match.awayTeam.abbreviation}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-white">
                    {match.awayTeam.score}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="bg-zinc-700" />
      </ScrollArea>
    </div>
  );
}
