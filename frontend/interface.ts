import { Decimal128 } from "mongoose";

export interface CampgroundItem {
  _id: string;
  number: number;
  name: string;
  cooradinate: string;
  province: string;
  postalcode: string;
  telephone: string;
  region: string;
  appointments: string[];
  picture: string;
  price: Decimal128;
}

export interface CampgroundJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CampgroundItem[];
}

export interface AppointmentItem {
  _id: string;
  apptDate: string;
  user: string;
  campground: Object;
  createdAt: Date;
}

export interface AppointmentJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: AppointmentItem[];
}

export interface PaymentItem {
  _id: string;
  status: string;
  rent_date: Date;
  successful_payment_date: Date;
  submitted_slip_images: String[];
  successful_payment_slip_image: Object;
  campground: CampgroundItem;
  user: UserItem;
  appointment: Object;
}

export interface Slip {
  _id: string,
  slip_image: Buffer;
  submit_time: Date;
  payment_id: string;
}

export interface PaymentJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: PaymentItem[];
}

export interface UserItem {
  _id: string;
  name: string;
  telephone: string;
  email: string;
  role: string;
  createdAt: Date;
}

export interface OnePaymentJson{
  success: boolean;
  data: PaymentItem;
  campgroundPrice: string;
}