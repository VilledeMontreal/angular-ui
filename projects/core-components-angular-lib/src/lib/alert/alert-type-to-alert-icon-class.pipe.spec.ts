import { AlertTypeToAlertIconClassPipe } from './alert-type-to-alert-icon-class.pipe';

describe('AlertTypeToAlertIconClassPipe', () => {
  it('create an instance', async () => {
    const pipe = new AlertTypeToAlertIconClassPipe();
    await expect(pipe).toBeTruthy();
  });
});
