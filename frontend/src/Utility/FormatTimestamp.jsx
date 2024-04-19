const FormatTimestamp = (timestamp) => {
  // Convert ISO 8601 timestamp to JavaScript Date object
  const date = new Date(timestamp);

  // Format options for the desired output
  const options = {
    day: "2-digit", // Two-digit day of the month (e.g., 01, 02, ...)
    month: "long", // Full month name (e.g., January)
    year: "numeric", // Full year (e.g., 2024)
    hour: "numeric", // Hour in 12-hour format (e.g., 4)
    minute: "2-digit", // Two-digit minutes (e.g., 59)
    hour12: true, // Use 12-hour clock with "am/pm"
  };

  // Format the date string
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
};

export default FormatTimestamp;
