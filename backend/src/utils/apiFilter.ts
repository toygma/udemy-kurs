import { Query } from "mongoose"; // TypeScript için Mongoose sorgu tipini içe aktarır.

class ApiFilter {
  // Sınıf özellikleri (Properties)
  query: Query<any, any>;          // Üzerinde işlem yapılacak Mongoose sorgusu (Örn: Doctor.find())
  queryStr: Record<string, any>;   // URL'den gelen parametreler (Örn: req.query -> { page: '2', keyword: 'ali' })

  // Kurucu Metot (Constructor): Sınıf çağrıldığında ilk çalışan kısımdır.
  constructor(query: Query<any, any>, queryStr: Record<string, any>) {
    this.query = query;            // Gelen sorguyu sınıfın özelliğine atar.
    this.queryStr = queryStr;      // Gelen URL parametrelerini sınıfın özelliğine atar.
  }

  // Sayfalama (Pagination) Metodu
  // resPerPage: Bir sayfada kaç sonuç gösterileceği (Örn: 10)
  pagination(resPerPage: number) {
    
    // 1. Adım: Mevcut sayfa numarasını al.
    // Eğer URL'de '?page=2' varsa onu sayıya çevir, yoksa varsayılan olarak 1 kabul et.
    const currentPage = Number(this.queryStr.page) || 1;

    // 2. Adım: Veritabanından kaç kayıt "atlanacağını" (skip) hesapla.
    // Mantık: (Şu anki sayfa - 1) * Sayfa başına kayıt sayısı.
    // Örnek: Sayfa 2 istiyorsak ve sayfa başı 10 kayıt varsa: (2-1)*10 = İlk 10 kaydı atla (gösterme).
    const skip = resPerPage * (currentPage - 1);

    // 3. Adım: Mongoose sorgusunu güncelle.
    // .limit(resPerPage): Veritabanından en fazla X kadar veri getir (Sayfa limiti).
    // .skip(skip): Baştan Y kadar veriyi pas geç (Önceki sayfaların verisi).
    this.query = this.query.limit(resPerPage).skip(skip);

    // 4. Adım: 'this' döndürerek metodun zincirleme (chaining) kullanılmasını sağlar.
    // Örn: new ApiFilter().search().filter().pagination() şeklinde kullanım için.
    return this; 
  }
}

export default ApiFilter;