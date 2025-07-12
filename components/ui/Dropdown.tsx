"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDown, Check } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
};

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Chọn một mục",
  icon,
}: DropdownProps) {
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700  cursor-pointer shadow-sm transition-colors hover:bg-gray-50 focus:outline-none">
          {icon}
          {selectedLabel}
          <ChevronDown className="-mr-1 ml-1 h-4 w-4" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-50 right-0 mt-2 w-48 origin-top-right rounded-md border border-gray-200 bg-white shadow-lg focus:outline-none ">
          <div className="py-1">
            {options.map((option) => (
              <Menu.Item key={option.value}>
                {({ active }) => (
                  <button
                    onClick={() => onChange(option.value)}
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } group flex w-full  cursor-pointer items-center px-4 py-2 text-sm`}
                  >
                    {option.label}
                    {value === option.value && (
                      <Check className="ml-auto h-4 w-4 text-blue-600" />
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
