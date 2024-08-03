function formatDateToString(date) {
  const dateDate = new Date(date);
  const now = new Date();
  const timeDiff = now - dateDate; // 时间差，单位为毫秒

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 2) {
    const y = dateDate.getFullYear();
    const m = dateDate.getMonth() + 1;
    const d = dateDate.getDate();
    return `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
  }
  else if (days > 7) {
    return `一周前`;
  } else if (days > 3) {
    return `三天前`;
  } else if (days > 2) {
    return `${days}天前`;
  }
  else if (days > 1) {
    return `前天`;
  } else if (hours > 24) {
    return `昨天`;
  } else if (hours > 0) {
    return `${hours}小时前`;
  } else if (minutes > 0) {
    return `${minutes}分钟前`;
  } else {
    return `刚刚`;
  }
}

export { formatDateToString as formateDateToString };