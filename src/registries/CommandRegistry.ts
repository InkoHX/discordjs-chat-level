import { Command } from '../structures'
import { RegisterData, Registry } from './Registry'

export class CommandRegistry extends Registry<string, Command> {
  public async registerAll (): Promise<Command[]> {
    const modules = (await this.scanFiles('commands/**/*.{js,ts}'))
      .map((file) => this.loadModule(file))

    const result = (await Promise.all(modules))
      .filter<Command>((value): value is Command => value instanceof Command)
      .map<RegisterData<string, Command>>((command) => this.toRegisterData(command))

    return super.registerAll(result)
  }

  private toRegisterData (command: Command): RegisterData<string, Command> {
    return {
      key: command.name,
      value: command
    }
  }
}
