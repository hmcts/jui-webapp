import { CaseViewerModule } from './case-viewer.module';

describe('CaseViewerModule', () => {
  let caseViewerModule: CaseViewerModule;

  beforeEach(() => {
    caseViewerModule = new CaseViewerModule();
  });

  it('should create an instance', () => {
    expect(caseViewerModule).toBeTruthy();
  });
});
