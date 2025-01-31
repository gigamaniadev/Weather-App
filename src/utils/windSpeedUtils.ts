export const convertWindSpeed = (speed: number, unit: string): { value: number; unit: string } => {
  switch (unit) {
    case 'mph':
      return {
        value: Math.round(speed * 0.621371),
        unit: 'mph'
      };
    case 'ms':
      return {
        value: Math.round(speed * 0.277778),
        unit: 'm/s'
      };
    default:
      return {
        value: Math.round(speed),
        unit: 'km/h'
      };
  }
};