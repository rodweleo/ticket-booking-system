export class Ticket {
  id: string;
  type: "VIP" | "Regular";
  amount: number;

  constructor(id: string, type: "VIP" | "Regular", amount: number) {
    this.amount = amount;
    this.id = id;
    this.type = type;
  }
}
