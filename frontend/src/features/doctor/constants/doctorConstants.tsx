import {
  User,
  Heart,
  Activity,
  Baby,
  Brain,
  Bone,
  Eye,
  MessageCircle,
  Dna,
  Coffee,
  Smile,
} from "lucide-react";

export const categories = [
  { id: "all", name: "Tüm Doktorlar", icon: <User /> },
  { id: "cardiologist", name: "Kardiyolog", icon: <Heart /> },
  { id: "dermatologist", name: "Dermatolog", icon: <Activity /> },
  { id: "pediatrician", name: "Pediatrist", icon: <Baby /> },
  { id: "neurologist", name: "Nörolog", icon: <Brain /> },
  { id: "orthopedic_surgeon", name: "Ortopedik Cerrah", icon: <Bone /> },
  { id: "ophthalmologist", name: "Göz Doktoru", icon: <Eye /> },
  { id: "psychiatrist", name: "Psikiyatrist", icon: <MessageCircle /> },
  { id: "endocrinologist", name: "Endokrinolog", icon: <Dna /> },
  { id: "gastroenterologist", name: "Gastroenterolog", icon: <Coffee /> },
  { id: "dentist", name: "Diş Hekimi", icon: <Smile /> },
];
