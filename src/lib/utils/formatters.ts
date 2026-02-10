export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };
  
  export const getPlaceholderImage = (width: number, height: number): string => 
    `https://placehold.co/${width}x${height}`;
  
  export const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };