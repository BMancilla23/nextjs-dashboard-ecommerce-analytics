export function formatPrice(amount: number, curreny = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: curreny,
    minimumFractionDigits: 2,
  }).format(amount);
}
