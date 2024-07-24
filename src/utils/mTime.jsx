function formateDateToString(date) {
  let dateDate = new Date(date),
    y = dateDate.getFullYear(),
    m = dateDate.getMonth() + 1,
    d = dateDate.getDate();
  return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + dateDate.toTimeString().slice(0, 5);
}

export { formateDateToString };