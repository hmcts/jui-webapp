import { RoutingModule } from './routing.module';

xdescribe('RoutingModule', () => {
  let routingModule: RoutingModule;

  beforeEach(() => {
    routingModule = new RoutingModule();
  });

  it('should create an instance', () => {
    expect(routingModule).toBeTruthy();
  });
});
