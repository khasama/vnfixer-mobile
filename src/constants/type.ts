export const cities = [
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cần Thơ",
  "Cao Bằng",
  "Đà Nẵng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Nội",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hậu Giang",
  "Hồ Chí Minh",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];

export enum RequestStatus {
  PENDING = "PENDING",
  PICKED = "PICKED",
  ACCEPT = "ACCEPT",
  DONE = "DONE",
  CANCEL = "CANCEL",
}

export enum RoleType {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  AGENCY = "AGENCY",
}

export enum AgencyRoleType {
  STAFF = "STAFF",
  MANAGER = "MANAGER",
}

export interface IUser {
  id?: number;
  email: string;
  phone?: string;
  address?: string;
  fullName?: string;
  imageUrl?: string;
  active: boolean;
  role: RoleType;
  branchId: number | null;
  agencyRole: AgencyRoleType | null;
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
  requests?: IRequest[];
  agencies?: IAgency[];
}

export interface IRequest {
  id?: number;
  title: string;
  description: string;
  city: string;
  location: string;
  expectDate: string[] | string;
  categoryId: number;
  status?: RequestStatus;
  branchId?: number | null;
  customerPhone: string;
  customerName: string;
  customerEmail: string;
  userId?: number;
  category?: ICategory;
  branch?: IBranch;
  staffId?: number;
}

export interface IBranch {
  id: number;
  city: string;
  address: string;
  requests: IRequest[];
  users: IUser[];
  agency?: IAgency;
}

export interface IAgency {
  id: number;
  name: string;
  description: string;
  logo: string;
  category: ICategory;
  ratings: IRating[];
  branches?: IBranch[];
}

export interface IRating {
  id: string;
  userId: number;
  agencyId: number;
  rating: number;
}
