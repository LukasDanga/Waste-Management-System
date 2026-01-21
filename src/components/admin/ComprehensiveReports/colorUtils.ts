export const getColorClasses = (color: string) => {
  const classes = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
    teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  }[color];
  return classes || { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' };
};
