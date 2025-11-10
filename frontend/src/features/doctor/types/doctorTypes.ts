export interface DoctorSlot {
  id: number;
  day: string;
  number: number;
  time?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "doctor";
  speciality: string; 
  experience: string;
  fee: string;
  patients: string; 
  available: boolean; 
  averageRating: number;
  totalRating: number;
  about: string;
  appointmentDurationMinutes: number;
  specialityKey: string;
  address: {
    street: string;
    city: string;
    district: string;
    postalCode: string;
    country: string;
  };

 
  appointments: string[];
  reviews: any[]; 
  awards: {
    title?: string;
    year?: string | number;
    organization?: string;
  }[];
  education: {
    degree?: string;
    university?: string;
    year?: string | number;
  }[];
  services: string[];
  workingHours: {
    day: string;
    startTime: string;
    endTime: string;
  }[];

  images: [
    {
      public_id: string;
      url: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
}


export interface IDoctorCardProps {
  filteredDoctors:Doctor[]
}