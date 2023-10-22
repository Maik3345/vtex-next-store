export interface ProductSearchType {
  products: Product[];
  recordsFiltered: number;
  correction: Correction | null;
  fuzzy: string;
  operator: string;
  translated: boolean;
  pagination: Pagination | null;
}

export interface Correction {
  misspelled: boolean;
}

export interface Pagination {
  count: number;
  current: Current;
  before: any[];
  after: Current[];
  perPage: number;
  next: Current;
  previous: First;
  first: First;
  last: Current;
}

export interface Current {
  index: number;
  proxyUrl: string;
}

export interface First {
  index: number;
}

export interface Product {
  cacheId: string;
  productId: string;
  description: string;
  productName: string;
  linkText: string;
  brand: string;
  brandId: number;
  link: string;
  categories: string[];
  categoryId: string;
  categoriesIds: string[];
  priceRange: PriceRange;
  specificationGroups: SpecificationGroup[];
  skuSpecifications: SkuSpecification[];
  productClusters: ClusterHighlight[];
  clusterHighlights: ClusterHighlight[];
  properties: Property[];
  items: Item[];
  releaseDate: number;
  origin: Origin;
  productReference?: string;
}

export interface ClusterHighlight {
  id: string;
  name: string;
}

export interface Item {
  sellers: Seller[];
  images: ImageProductType[];
  itemId: string;
  name: string;
  nameComplete: string;
  complementName: ComplementName;
  referenceId: ReferenceID[];
  measurementUnit: MeasurementUnit;
  unitMultiplier: number;
  variations: Variation[];
  ean: string;
  modalType: string;
  videos: any[];
  attachments: any[];
  isKit: boolean;
  Talla?: string[];
  Color?: string[];
  Tamaño?: string[];
}

export enum ComplementName {
  Empty = "",
  JeanTrimFitParaHombreLecLeeÍndigoClaro = "Jean Trim Fit para Hombre Lec Lee - Índigo Claro",
}

export interface ImageProductType {
  imageId: string;
  cacheId: string;
  imageTag: string;
  imageLabel: string;
  imageText: string;
  imageUrl: string;
}

export enum MeasurementUnit {
  Un = "un",
}

export interface ReferenceID {
  Key: Key;
  Value?: string;
}

export enum Key {
  RefID = "RefId",
}

export interface Seller {
  sellerId: string;
  sellerName: SellerName;
  addToCartLink: string;
  sellerDefault: boolean;
  commertialOffer: CommertialOffer;
}

export interface CommertialOffer {
  DeliverySlaSamplesPerRegion: DeliverySlaSamplesPerRegion;
  DeliverySlaSamples: any[];
  AvailableQuantity: number;
  discountHighlights: any[];
  Installments: Installment[];
  Price: number;
  ListPrice: number;
  spotPrice: number;
  taxPercentage: number | null;
  PriceWithoutDiscount: number;
  Tax: number;
  GiftSkuIds: any[];
  BuyTogether: any[];
  ItemMetadataAttachment: any[];
  RewardValue: number;
  PriceValidUntil: Date | null;
  GetInfoErrorMessage: null;
  CacheVersionUsedToCallCheckout: string;
  teasers: any[];
}

export interface DeliverySlaSamplesPerRegion {}

export interface Installment {
  PaymentSystemName: PaymentSystemName;
  Value: number;
  InterestRate: number;
  TotalValuePlusInterestRate: number;
  NumberOfInstallments: number;
  Name: Name;
  PaymentSystemGroupName: PaymentSystemGroupName;
}

export enum Name {
  PuntosColombiaProducciónÀVista = "Puntos Colombia Producción à vista",
}

export enum PaymentSystemGroupName {
  Custom202PaymentGroupPaymentGroup = "custom202PaymentGroupPaymentGroup",
}

export enum PaymentSystemName {
  PuntosColombiaProducción = "Puntos Colombia Producción",
}

export enum SellerName {
  Blind = "blind",
  EstudioDeModa = "Estudio de moda",
  GrupoÉxito = "Grupo Éxito",
  LecLee = "Lec Lee",
  MercedesCampuzano = "Mercedes Campuzano",
  PuntosColombia = "Puntos Colombia",
  Spirito = "Spirito",
  Tennis = "Tennis",
  Ventasenlineacol = "ventasenlineacol",
}

export interface Variation {
  name: VariationName;
  values: string[];
}

export enum VariationName {
  Color = "Color",
  Talla = "Talla",
  Tamaño = "Tamaño",
}

export enum Origin {
  IntelligentSearch = "intelligent-search",
}

export interface PriceRange {
  sellingPrice: Price;
  listPrice: Price;
}

export interface Price {
  highPrice: number;
  lowPrice: number;
}

export interface Property {
  name: string;
  originalName: string;
  values: string[];
}

export interface SkuSpecification {
  field: Field;
  values: Field[];
}

export interface Field {
  name: string;
  originalName: string;
}

export interface SpecificationGroup {
  originalName: OriginalNameEnum;
  name: OriginalNameEnum;
  specifications: Property[];
}

export enum OriginalNameEnum {
  AllSpecifications = "allSpecifications",
  Contenido = "Contenido",
  Filtros = "Filtros",
}
