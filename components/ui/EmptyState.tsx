"use client";

import Link from "next/link";
import React from "react";

type EmptyStateProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  onButtonClick?: () => void;
};

export default function EmptyState({
  icon,
  title,
  description,
  buttonText,
  buttonLink,
  onButtonClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
      <div className="text-gray-400">{icon}</div>
      <p className="mt-4 text-xl font-semibold text-gray-700">{title}</p>
      {description && <p className="mt-2 text-gray-500">{description}</p>}
      {buttonText && buttonLink && (
        <Link
          href={buttonLink}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-950 focus:outline-none "
        >
          {buttonText}
        </Link>
      )}
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-950 focus:outline-none "
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
