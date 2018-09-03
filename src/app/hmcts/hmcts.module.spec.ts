import { HmctsModule } from './hmcts.module';

describe('HmctsModule', () => {
  let hmctsModule: HmctsModule;

  beforeEach(() => {
    hmctsModule = new HmctsModule();
  });

  it('should create an instance', () => {
    expect(hmctsModule).toBeTruthy();
  });
});
