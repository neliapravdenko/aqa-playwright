export class CarsFactory {
  static createCar(brand: number, model: number | null = null, mileage: number) {
    return {
      carBrandId: brand,
      carModelId: model,
      mileage,
    };
  }
}
