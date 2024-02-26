export const PAGE_SIZE = 10

export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end)

    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );

  export const convertTimestamp = (timestamp) => {
    if (!timestamp) {
      return 'Invalid Timestamp';
    }
    const dateObject = new Date(timestamp);
  
    const formattedDateTime = dateObject.toLocaleString(undefined, {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  
    return formattedDateTime;
  }
  

