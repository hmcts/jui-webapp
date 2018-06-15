import { CaseViewerModule } from './case-viewer.module';

xdescribe('CaseViewerModule', () => {
  let caseViewerModule: CaseViewerModule;

  beforeEach(() => {
    caseViewerModule = new CaseViewerModule();
  });

  it('should create an instance', () => {
    expect(caseViewerModule).toBeTruthy();
  });
});
