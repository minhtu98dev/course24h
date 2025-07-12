"use client";

import Link from "next/link";
import { Mail, Phone, GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:gap-48 lg:grid-cols-3">
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-white"
            >
              <GraduationCap className="h-7 w-7 text-blue-600" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent">
                Course24h
              </span>
            </Link>
            <p className="mt-4 text-sm">
              Nền tảng giáo dục trực tuyến tích hợp AI, giúp bạn khám phá và
              chinh phục tri thức một cách hiệu quả nhất.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Liên hệ
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <a
                  href="mailto:contact@eduplatform.com"
                  className="text-sm transition-colors hover:text-white"
                >
                  tupm.dev@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <a
                  href="tel:+84123456789"
                  className="text-sm transition-colors hover:text-white"
                >
                  (+84) 393 940 022
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className=" mt-4 border-t border-gray-700  text-center text-sm">
          <p className="mt-2">
            &copy; {new Date().getFullYear()} EduPlatform. All rights reserved.
          </p>
          <p className="mt-1 ">
            Thiết kế bởi
            <a href="#" className="font-semibold ml-1 hover:text-white">
              Phạm Minh Tú
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
