
export type Slide = {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};

// Mảng dữ liệu chứa các slide
export const slides: Slide[] = [
      {
    id: 1,
    image: "/slides/slide1.jpg",
    title: "Lập Trình Full Stack với React & Next.js",
    description: "Trở thành lập trình viên Full Stack chuyên nghiệp với React, Next.js và các công nghệ hiện đại nhất.",
    buttonText: "Khám phá ngay",
    buttonLink: "/",
  },
  {
    id: 2,
    image: "/slides/slide2.jpg",
    title: "Khuyến Mãi Hè, Giảm Giá Sốc!",
    description: "Giảm giá lên đến 50% cho tất cả các khóa học Công nghệ. Đừng bỏ lỡ cơ hội nâng cao kỹ năng của bạn.",
    buttonText: "Khám phá ngay",
    buttonLink: "/",
  },
  {
    id: 3,
    image: "/slides/slide3.jpg",
    title: "Trở Thành Chuyên Gia AI & Machine Learning",
    description: "Bắt đầu hành trình của bạn với các khóa học về Khoa học dữ liệu và Học máy được xây dựng bởi các chuyên gia hàng đầu.",
    buttonText: "Xem khóa học",
    buttonLink: "/",
  },
  {
    id: 4,
    image: "/slides/slide4.jpg",
    title: "Học Mọi Lúc, Mọi Nơi",
    description: "Với nền tảng của chúng tôi, bạn có thể học tập linh hoạt trên mọi thiết bị, từ máy tính đến điện thoại di động.",
    buttonText: "Tìm hiểu thêm",
    buttonLink: "/",
  },
];