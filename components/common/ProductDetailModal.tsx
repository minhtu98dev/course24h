"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import { X, Star, Heart, Users, Clock } from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice } from "@/utils/formatters";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

type ProductDetailModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  if (!product) return null;

  const favorited = isFavorite(product.id);

  const handleFavoriteClick = () => {
    toggleFavorite(product.id);
  };

  const handleRegister = () => toast.success("Đăng ký thành công!");

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success("Đã thêm vào giỏ hàng!");
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-10 md:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-4xl transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl transition-all">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {product.name}
                  </h3>
                  <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {product.image && (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="mt-2">
                      {product.category && (
                        <span className=" bg-gray-500 text-xs text-white px-3 py-1 rounded-full shadow">
                          {product.category}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-blue-500">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        onClick={handleFavoriteClick}
                        className="p-2 rounded-full border border-gray-200 hover:bg-red-50"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favorited
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <Star
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                        />
                        <span className="font-medium">
                          {product.rating?.toFixed(1)}
                        </span>
                        <span className="text-gray-500">đánh giá</span>
                      </div>
                      <div className="flex items-center gap-2 justify-end text-right">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">
                          {product.enrolledCount?.toLocaleString()} học viên
                        </span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2 mt-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{product.duration}</span>
                      </div>
                    </div>
                    <div className="border-b-2 border-gray-200 my-4"></div>
                    {product.instructor && (
                      <div className=" text-sm text-gray-900">
                        <h4 className="font-bold mb-1">Giảng viên</h4>
                        <p className="text-gray-600">{product.instructor}</p>
                      </div>
                    )}
                    <div className="border-b-2 border-gray-200 my-4"></div>
                    {product.longDescription && (
                      <div className=" text-sm text-gray-900">
                        <h4 className="font-bold mb-1">Mô tả khóa học</h4>
                        <p className="text-gray-600">
                          {product.longDescription}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6">
                      <button
                        onClick={handleRegister}
                        className="flex-1 rounded-md bg-gray-800  px-4 py-2 text-white font-semibold hover:bg-gray-900 transition-colors duration-400"
                      >
                        Đăng ký ngay
                      </button>
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-800 font-semibold hover:bg-gray-100 transition-colors duration-400"
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
