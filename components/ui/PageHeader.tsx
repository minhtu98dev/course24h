import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import React from "react";

type PageHeaderProps = {
  title: string;
};

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <Link href="/" className="flex items-center mb-8 gap-4">
      <ArrowLeft className="h-6 w-6 hover:scale-110 transform duration-300" />

      <h4 className="text-xs font-bold tracking-tight text-gray-900 md:text-2xl">
        {title}
      </h4>
    </Link>
  );
};

export default PageHeader;
