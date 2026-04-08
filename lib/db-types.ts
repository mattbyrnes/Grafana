export interface DbUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface DbUserClinic {
  id: string;
  user_id: string;
  name: string;
  city: string;
  region: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  price_range: string;
  hours: string;
  services: string[];
  image_url: string;
  status: "approved" | "pending" | "rejected";
  created_at: string;
  updated_at: string;
}
