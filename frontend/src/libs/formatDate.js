export function formatDate(dateInp) {
  const date = new Date(dateInp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
