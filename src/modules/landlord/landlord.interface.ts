import { RentalStatus } from "../../../generated/prisma/browser";

export interface ICreateProperty {
  title: string;
  description: string;
  rent: number;
  city: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  areaSqFt?: number;
  amenities: string[];
  image?: string;

  categoryId: string;
  landlordId: string;
}
export interface IUpdateRentalRequestStatus {
  status: RentalStatus;
}
