import { APIRequestContext, APIResponse } from 'playwright';
import { carToAddRequest } from '../interfaces/car.interface';
import { expect } from 'playwright/test';

export default class ErrorsController {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async triggerError(car: carToAddRequest, sid?: string, expectedStatus: number = 400): Promise<APIResponse> {
    const options = {
      data: car,
      ...(sid && { headers: { Cookie: sid } }),
    };
    const response = await this.request.post('/api/cars', options);
    expect(response.status()).toBe(expectedStatus);
    return response;
  }

  async verifyErrorMessage(
    car: carToAddRequest,
    expectedMessage: string,
    expectedStatus: number,
    sid?: string
  ): Promise<void> {
    const response = await this.triggerError(car, sid, expectedStatus);
    const body = await response.json();
    expect(body.status).toBe('error');
    expect(body.message).toBe(expectedMessage);
  }
}
