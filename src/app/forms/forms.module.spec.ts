import { JUIFormsModule } from './forms.module';

describe('JUIFormsModule', () => {
  let formsModule: JUIFormsModule;

  beforeEach(() => {
    formsModule = new JUIFormsModule();
  });

  it('should create an instance', () => {
    expect(formsModule).toBeTruthy();
  });
});
