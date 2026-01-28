import React from "react";
import { FaVoteYea } from "react-icons/fa";
import { Link } from "react-router";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <FaVoteYea className="text-indigo-600 text-2xl" />
      <span className="text-xl font-bold text-slate-800">
        Vote Ballot:{" "}
        <span className="text-indigo-600">An Online Voting Platform</span>
      </span>
    </Link>
  );
}
