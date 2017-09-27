export default function(date) {
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня", "июля",
    "августа", "сентября", "октября", "ноября", "декабря"
  ];

  return date.getDate() + " " + months[date.getMonth()];
}
