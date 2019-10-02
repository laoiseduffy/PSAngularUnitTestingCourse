import { MessageService } from './message.service';

describe('Message Service', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('should have no messages to start', () => {
    expect(service.messages).toEqual([]);
    expect(service.messages.length).toEqual(0);

  });

  it('should add a new message to the array', () => {
    const newMessage = 'Hi';

    service.add(newMessage);

    expect(service.messages.length).toBe(1);
  });

  it('should clear the message array when the clear method is called', () => {

    service.add('hello');
    expect(service.messages.length).toBe(1);
    service.add('hi');
    expect(service.messages.length).toBe(2);

    service.clear();
    expect(service.messages.length).toBe(0);
  });


});
