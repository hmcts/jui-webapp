import { GovukModule } from './govuk.module';

describe('GovukModule', () => {
  let govukModule: GovukModule;

  beforeEach(() => {
    govukModule = new GovukModule();
  });

  it('should create an instance', () => {
    expect(govukModule).toBeTruthy();
  });
});
