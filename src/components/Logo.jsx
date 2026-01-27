import React from "react";
import { Link } from "react-router";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-xl md:text-2xl font-black tracking-tight"
    >
      <span className="text-3xl">🗳️</span>
      <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        VoteBallot
      </span>
    </Link>
  );
}
