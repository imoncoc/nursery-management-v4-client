export type TCareInformation = {
  wateringRequirements: string;
  sunlightRequirements: string;
  soilType: string;
  fertilization: string;
  pruning: string;
  pestsAndDiseases: string;
};

export type TAdditionalInformation = {
  origin: string;
  seasonality: string;
  hardiness: string;
  toxicity: string;
  uses: string;
};

export type TPhysicalCharacteristics = {
  height: string;
  spread: string;
  growthRate: string;
  matureHeight: string;
  matureSpread: string;
  plantingZone: string;
};

export type TProduct = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  availabilityStock: boolean;
  rating: number;
  thumbnail: string;
  images: string[];
  categoriesName: string;
  physicalCharacteristics: TPhysicalCharacteristics;
  careInformation: TCareInformation;
  additionalInformation: TAdditionalInformation;
};
