export const dateFormatterForApi = (selectedDate?: Date) => {
    if (!selectedDate) return undefined;
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Zero-based month
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const hours = String(selectedDate.getHours()).padStart(2, "0");
    const minutes = String(selectedDate.getMinutes()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDate + " IST"; // YYYY-MM-DD HH:mm z
  };

  export const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  export function getMonthName(monthNumber: number) {
    return monthNames[monthNumber];
  }
  
  export function utcToReadableIst(utcTimeString: string, noTime?: boolean) {
    if (!utcTimeString) {
      return "";
    }
    // 1. Create a Date object from the UTC time string
    if (!utcTimeString.includes("UTC")) {
      return utcTimeString;
    }
    const utcDate = new Date(utcTimeString);
  
    // 2. Calculate the IST time
    const istDate = new Date(utcDate.getTime());
  
    // 3. Extract and format date components
    const formattedDate = `${istDate.getDate()}${
      istDate.getDate() == 1 ? "st" : istDate.getDate() == 2 ? "nd" : istDate.getDate() == 3 ? "rd" : "th"
    } ${getMonthName(istDate.getMonth())} ${istDate.getFullYear()}`;
  
    // 4. Extract and format time components
    const hours = istDate.getHours();
    const minutes = istDate.getMinutes().toString().padStart(2, "0");
    let timeFormat = `${hours % 12 || 12}:${minutes} ${hours < 12 ? "AM" : "PM"}`;
  
    // 5. Handle midnight (12 AM) for better readability
    if (hours === 0) {
      timeFormat = "12:00 AM";
    }
  
    if (noTime) {
      return formattedDate;
    }
    // 6. Combine formatted date and time
    const formattedTime = `${formattedDate}, ${timeFormat}`;
  
    return formattedTime;
  }