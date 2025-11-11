export interface Review {
  _id: string;              // "Her review'ün benzersiz ID'si olacak"
  user: {
    name: string;           // "Kullanıcı adı"
    image?: string;         // "Profil fotoğrafı opsiyonel"
  };
  rating: number;           // "1-5 arası puan"
  comment: string;          // "Yorum metni"
  createdAt: string;        // "Oluşturma tarihi"
}