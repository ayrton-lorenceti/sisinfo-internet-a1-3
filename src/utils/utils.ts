module.exports = class Utils {
  public static calculateFreightPrice(productWeight: number): number {
    if(productWeight <= 5) return productWeight * 1;

    if(productWeight <= 10) return productWeight * 2;

    return productWeight * 3;
  };
}