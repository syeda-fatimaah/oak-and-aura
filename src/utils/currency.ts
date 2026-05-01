// Pakistani Rupee formatter
// All prices in the product data are treated as USD base values
// We multiply by ~280 (approx PKR rate) for display

export const PKR_RATE = 280;

export function formatPKR(usdPrice: number): string {
  const pkr = Math.round(usdPrice * PKR_RATE);
  return `Rs. ${pkr.toLocaleString('en-PK')}`;
}

export function toPKR(usdPrice: number): number {
  return Math.round(usdPrice * PKR_RATE);
}

