export interface DoctorSlot {
  id: number;
  day: string;
  number: number;
  time?: string;
}

export interface Education {
  degree: string;
  university: string;
  year: string;
}

export interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "doctor";
  speciality: string;
  experience: number;
  fee: number;
  patients: number;
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
      url: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
}

export interface IDoctorCardProps {
  filteredDoctors: Doctor[];
}

export interface ITimeSlot {
  time: string;
  dateTime: Date;
  available: boolean;
}
