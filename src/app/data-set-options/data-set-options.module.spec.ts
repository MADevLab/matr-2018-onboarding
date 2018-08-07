import { DataSetOptionsModule } from './data-set-options.module';

describe('DataSetOptionsModule', () => {
  let dataSetOptionsModule: DataSetOptionsModule;

  beforeEach(() => {
    dataSetOptionsModule = new DataSetOptionsModule();
  });

  it('should create an instance', () => {
    expect(dataSetOptionsModule).toBeTruthy();
  });
});
