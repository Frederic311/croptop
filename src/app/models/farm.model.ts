export class Farm {
  id: number;
  name: string;
  description: string;
  userId: number;
  showMenu?: boolean; // Optional property for UI logic

  constructor(id: number, name: string, description: string, userId: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.userId = userId;
    this.showMenu = false; // Initialize showMenu as false
  }
}
