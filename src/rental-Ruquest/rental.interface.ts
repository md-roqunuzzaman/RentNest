export interface ICreateRentalRequest {
  propertyId: string;
  moveInDate: Date;
  months: number;
  message?: string;
}
