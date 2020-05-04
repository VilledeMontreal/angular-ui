import { AlertTypeToAlertClassPipe } from './alert-type-to-alert-class.pipe';

describe('AlertTypeToAlertClassPipe', () => {
  it('create an instance', () => {
    const pipe = new AlertTypeToAlertClassPipe();
    expect(pipe).toBeTruthy();
  });
});
