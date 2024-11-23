import React from 'react';

function Paragraph() {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-extrabold mb-4 text-gray-800 dark:text-gray-100" style={{ fontFamily: "'Roboto Slab', serif" }}>
        Danh sách đóng góp khắc phục hậu quả bão số 3 Yagi cho MTTQVN
      </h1>
      <p className="text-lg text-gray-500 dark:text-gray-400 italic mb-6">
        Theo danh sách công bố từ MTTQVN đến ngày 15/09/2024
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        <strong>Miễn trừ trách nhiệm:</strong> Thông tin được cung cấp từ MTTQVN, chúng tôi chỉ XỬ LÝ DỮ LIỆU và giúp việc tìm kiếm, lọc dữ liệu đơn giản hơn. Để xem bản gốc vui lòng truy cập các liên kết sau:
      </p>
    </div>
  );
}

export default Paragraph;
