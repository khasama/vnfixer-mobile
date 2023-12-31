export function convertTime(inputTime: string) {
  // Tạo một đối tượng Date từ định dạng đầu vào
  const date = new Date(inputTime);

  // Chuyển múi giờ thành UTC+7
  date.setHours(date.getHours() + 7);

  // Lấy thông tin về ngày, tháng, năm, giờ, phút và giây
  const year = date.getUTCFullYear();
  const month = `0${date.getUTCMonth() + 1}`.slice(-2);
  const day = `0${date.getUTCDate()}`.slice(-2);
  const hours = `0${date.getUTCHours()}`.slice(-2);
  const minutes = `0${date.getUTCMinutes()}`.slice(-2);
  const seconds = `0${date.getUTCSeconds()}`.slice(-2);

  // Tạo định dạng mới
  const outputTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return outputTime;
}
