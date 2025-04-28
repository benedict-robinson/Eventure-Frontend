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