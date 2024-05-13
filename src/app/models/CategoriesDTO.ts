export interface CategoryTabDTO {
  id: string;
  titleAr: string;
  titleEn: string;
  image: string;
  AiTools: AiToolCateogryDTO[];
}

interface AiToolCateogryDTO {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  imageUrl: string;
  bodyAr: { _type: string; markDefs: any[]; children: { _type: string; marks: any[]; text: string; _key: string; }[]; }[];
  bodyEn: { _type: string; style: string; _key: string; markDefs: any[]; children: { _type: string; marks: any[]; text: string; _key: string; }[]; }[];
  price: number;
  externalUrl: string;
  tags: TagsDTO[];
}

interface TagsDTO {
  titleAr: string;
  titleEn: string;
}
