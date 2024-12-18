export const eUSLocale = (x) => {
  return x.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,                     
  });                     
};

