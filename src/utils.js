export function formatDate(dateString) {
    const date = new Date(dateString);
  
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
  
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }

  export function formatTime(time) {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }

  export function convertToMilliseconds(dateString, timeString) {
    const [year, month, day] = dateString.split('-').map(Number); 
    const [hour, minute] = timeString.split(':').map(Number);
  
    const date = new Date(year, month - 1, day, hour, minute);
    return date.getTime();
  }

  export function toLocalDateTime(date, time) {
    if (!date || !time) return null;
    const dateTimeString = `${date}T${time}`;
    const dateObj = new Date(dateTimeString);
    return isNaN(dateObj.getTime()) ? null : dateTimeString;
  }
  
  export function convertEventToGoogle(e) {
    const timeZone = e.date_and_time.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  
    const startDateTime = toLocalDateTime(e.date_and_time.start_date, e.date_and_time.start_time);
    if (!startDateTime) throw new Error("Invalid start date or time");
  
    let endDateTime = toLocalDateTime(e.date_and_time.end_date, e.date_and_time.end_time);
  
    if (!endDateTime) {
      const tempDate = new Date(startDateTime);
      tempDate.setHours(tempDate.getHours() + 1);
      endDateTime = tempDate.toISOString().slice(0, 19); 
    }
  
    return {
      summary: e.name || "Untitled Event",
      description: e.description || "Added from Eventure",
      start: {
        dateTime: startDateTime,
        timeZone: timeZone
      },
      end: {
        dateTime: endDateTime,
        timeZone: timeZone
      }
    };
  }

  