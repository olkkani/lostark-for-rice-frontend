export const formatPercent = (num: number): string => {
  const formatter = new Intl.NumberFormat("ko-KR", {
    signDisplay: "always",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "percent",
  });

  return formatter.format(num / 100); // 100으로 나누어 퍼센트 값으로 변환
};

export const formatPrice = (num: number): string => {
  const formatter = new Intl.NumberFormat("ko-KR");
  return `${formatter.format(num)}G`;
};

export const formatPriceAndSign = (num: number): string => {
  const formatter = new Intl.NumberFormat("ko-KR");
  const sign = num > 0 ? "+" : "";
  return `${sign}${formatter.format(num)}G`;
};

export const formatPriceWithNotSign = (num: number): string => {
  return new Intl.NumberFormat("ko-KR", {
    signDisplay: "exceptZero",
  }).format(num);
};
