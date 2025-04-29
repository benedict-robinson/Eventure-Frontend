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
    console.log({dateString, timeString})
    const [year, month, day] = dateString.split('-').map(Number); 
    const [hour, minute] = timeString.split(':').map(Number);
  
    const date = new Date(year, month - 1, day, hour, minute);
    return date.getTime();
  }
  