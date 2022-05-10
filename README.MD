# Frame Time
Là thời gian để thực hiện mỗi khung hình, đơn vị tính là ms. Frame time tốt là trong thời gian 10ms

# FrameRate
FPS là viết tắt của Frame Per Second - số khung hình trong một giây, nói cách khác FPS là thông số đo lường số lượng hình ảnh mà bộ xử lý đồ họa (GPU) có thể kết xuất (render) và hiển thị mỗi giây trên màn hình của bạn. FPS càng cao thì hình ảnh hiển thị trong game càng rõ nét. Trog cocos có thể set FrameRate nhưng fps thực sự phụ thuộc vào việc triển khai trò chơi của bạn và môi trường chạy

# DrawCall
Drawcall được hiểu là thời gian cần để cpu gọi api và hướng dẫn gpu render, đơn vị tính là ms, DrawCall càng nhỏ thì càng tốt, để giảm Drawcall thì có thể thực hiện thông qua việc giảm số lần gọi tới CPU trong khi tăng số lượng công việc trong 1 lần gọi, thông qua việc làm việc với Static image,Dynamic Atlas, Bitmap font, Text cache mode

# WebGL
Là thời gian thực hiện các việc xử lý từ code

# Renderer
Là quá trình tạo ra hình ảnh hai chiều hoặc ba chiều bằng các công cụ máy, trong. Cocos, cocos đảm nhận việc tạo hình ảnh từ các file hình ảnh, âm thanh kết hợp với code để tạo nên giao điện người dùng, đơn vị tính là ms
