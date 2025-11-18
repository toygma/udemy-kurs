interface Image {
  public_id: string;
  url: string;
}

interface Address {
  street: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
}

interface Award {
  title: string;
  year: string;
  description: string;
  organization: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  field: string;
}

interface TimeSlot {
  start: string; 
  end: string;   
}

interface WorkingHours {
  day: "Pazartesi" | "Salı" | "Çarşamba" | "Perşembe" | "Cuma" | "Cumartesi" | "Pazar";
  isAvailable: boolean;
  slots: TimeSlot[];
}

export interface Doctor {
  _id?: string;
  name: string;
  email: string;
  password?: string; 
  image: Image;
  speciality: string;
  available: boolean;
  role: "doctor";
  experience: number;
  about: string;
  education: Education[];
  services: string;
  address: Address;
  phone: string;
  fee: number;
  patients: number;
  awards: Award[];
  workingHours: WorkingHours[];
  createdAt?: string;
  updatedAt?: string;
}