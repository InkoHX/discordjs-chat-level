import { Event } from '../structures'
import { RegisterData, Registry } from './Registry'

export class EventRegistry extends Registry<string, Event> {
  public register (data: RegisterData<string, Event>): Event {
    const event = data.value

    if (event.once) event.emitter.once(event.eventName, event._bindRun)
    else event.emitter.on(event.eventName, event._bindRun)

    return super.register(data)
  }

  public unregister (key: string): Event {
    const event = super.unregister(key)

    event.emitter.removeListener(event.eventName, event._bindRun)

    return event
  }

  public async registerAll (): Promise<Event[]> {
    const modules = (await this.scanFiles('events/**/*.{js,ts}'))
      .map((file) => this.loadModule(file))

    const result = (await Promise.all(modules))
      .filter<Event>((value): value is Event => value instanceof Event)
      .map<RegisterData<string, Event>>((event) => this.toRegisterData(event))

    return super.registerAll(result)
  }

  private toRegisterData (event: Event): RegisterData<string, Event> {
    return {
      key: event.name,
      value: event
    }
  }
}
