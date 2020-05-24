import { Test, TestingModule } from '@nestjs/testing';
import { SetupService } from './setup.service';

describe('SetupService', () => {
  let service: SetupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetupService],
    }).compile();

    service = module.get<SetupService>(SetupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate session code of length 6', () => {
    expect(service.generateSessionCode()).toHaveLength(6);
  });

  it('should generate a unqiue session code each time', () => {
    let code1: string = service.generateSessionCode();
    let code2: string = service.generateSessionCode();
    expect(code1 != code2);
  });

});
