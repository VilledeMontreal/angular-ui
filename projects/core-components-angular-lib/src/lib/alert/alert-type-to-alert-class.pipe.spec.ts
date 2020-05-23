import { AlertTypeToAlertClassPipe } from './alert-type-to-alert-class.pipe';

describe('AlertTypeToAlertClassPipe', () => {
  it('create an instance', async () => {
    const pipe = new AlertTypeToAlertClassPipe();
    await expect(pipe).toBeTruthy();
  });
});
