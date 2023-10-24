export interface ProductType {
  productId: string;
  productName: string;
  brand: string;
  brandId: number;
  brandImageUrl: null;
  linkText: string;
  productReference: string;
  productReferenceCode: null;
  categoryId: string;
  productTitle: string;
  metaTagDescription: string;
  releaseDate: Date;
  clusterHighlights: ClusterHighlights;
  productClusters: { [key: string]: string };
  searchableClusters: { [key: string]: string };
  categories: string[];
  categoriesIds: string[];
  link: string;
  "Vendido por": string[];
  "Factor Neto PUM": string[];
  "Unidad de Medida PUM Calculado": string[];
  "Factor Escurrido PUM": string[];
  "Atributos Especificación": string[];
  allSpecifications: string[];
  allSpecificationsGroups: string[];
  description: string;
  items: ProductItemType[];
}

export interface ClusterHighlights {
  "11710": string;
}

export interface ProductItemType {
  itemId: string;
  name: string;
  nameComplete: string;
  complementName: string;
  ean: string;
  measurementUnit: string;
  unitMultiplier: number;
  modalType: null;
  isKit: boolean;
  images: Image[];
  sellers: ProductSellerType[];
  Videos: any[];
  estimatedDateArrival: null;
}

export interface Image {
  imageId: string;
  imageLabel: null;
  imageTag: string;
  imageUrl: string;
  imageText: null;
  imageLastModified: Date;
}

export interface ProductSellerType {
  sellerId: string;
  sellerName: string;
  addToCartLink: string;
  sellerDefault: boolean;
  commertialOffer: ProductCommertialOfferType;
}

export interface ProductCommertialOfferType {
  DeliverySlaSamplesPerRegion: ProductDeliverySlaSamplesPerRegionType;
  Installments: ProductInstallmentType[];
  DiscountHighLight: any[];
  GiftSkuIds: any[];
  Teasers: any[];
  PromotionTeasers: any[];
  BuyTogether: any[];
  ItemMetadataAttachment: any[];
  Price: number;
  ListPrice: number;
  PriceWithoutDiscount: number;
  RewardValue: number;
  PriceValidUntil: null;
  AvailableQuantity: number;
  IsAvailable: boolean;
  Tax: number;
  DeliverySlaSamples: DeliverySlaSample[];
  GetInfoErrorMessage: null | string;
  CacheVersionUsedToCallCheckout: string;
  PaymentOptions: PaymentOptions | null;
}

export interface DeliverySlaSample {
  DeliverySlaPerTypes: any[];
  Region: null;
}

export interface ProductDeliverySlaSamplesPerRegionType {
  "0"?: DeliverySlaSample;
}

export interface ProductInstallmentType {
  Value: number;
  InterestRate: number | null;
  TotalValuePlusInterestRate: number;
  NumberOfInstallments: number;
  PaymentSystemName: PaymentSystemNameEnum;
  PaymentSystemGroupName: GroupName;
  Name: ProductNameType;
}

export enum ProductNameType {
  AmericanExpress = "American Express",
  BancolombiaTransferÀVista = "Bancolombia Transfer à vista",
  CustomerCreditÀVista = "Customer Credit à vista",
  Diners = "Diners",
  Mastercard = "Mastercard",
  PSEÀVista = "PSE à vista",
  PagoEnAlmacenesÉxitoCarullaSurtimaxYSuperInterÀVista = "Pago en Almacenes Éxito, Carulla, Surtimax y Super Inter à vista",
  PuntosColombiaÀVista = "PuntosColombia à vista",
  TarjetaÉxitoYCarulla = "Tarjeta Éxito y Carulla",
  Visa = "Visa",
  WompiNequiÀVista = "Wompi - Nequi à vista",
}

export enum GroupName {
  BancolombiaTransferPaymentGroup = "Bancolombia TransferPaymentGroup",
  CreditCardPaymentGroup = "creditCardPaymentGroup",
  CreditControlPaymentGroup = "creditControlPaymentGroup",
  Custom201PaymentGroupPaymentGroup = "custom201PaymentGroupPaymentGroup",
  Custom202PaymentGroupPaymentGroup = "custom202PaymentGroupPaymentGroup",
  CustomPrivate501PaymentGroup = "customPrivate_501PaymentGroup",
  PSEPaymentGroup = "PSEPaymentGroup",
  PuntosColombiaPaymentGroup = "PuntosColombiaPaymentGroup",
  WompiNequiPaymentGroup = "WompiNequiPaymentGroup",
}

export enum PaymentSystemNameEnum {
  AmericanExpress = "American Express",
  BancolombiaTransfer = "Bancolombia Transfer",
  CustomerCredit = "Customer Credit",
  Diners = "Diners",
  Mastercard = "Mastercard",
  PagoContraEntrega = "Pago contra entrega",
  PagoEnAlmacenesÉxitoCarullaSurtimaxYSuperInter = "Pago en Almacenes Éxito, Carulla, Surtimax y Super Inter",
  Pse = "PSE",
  PuntosColombia = "PuntosColombia",
  TarjetaÉxitoYCarulla = "Tarjeta Éxito y Carulla",
  Visa = "Visa",
  WompiNequi = "Wompi - Nequi",
}

export interface PaymentOptions {
  installmentOptions: InstallmentOption[];
  paymentSystems: PaymentSystem[];
  payments: any[];
  giftCards: any[];
  giftCardMessages: any[];
  availableAccounts: any[];
  availableTokens: any[];
}

export interface InstallmentOption {
  paymentSystem: string;
  bin: null;
  paymentName: PaymentSystemNameEnum;
  paymentGroupName: GroupName;
  value: number;
  installments: InstallmentElement[];
}

export interface InstallmentElement {
  count: number;
  hasInterestRate: boolean | null;
  interestRate: number | null;
  value: number;
  total: number;
  sellerMerchantInstallments?: InstallmentElement[];
  id?: ID;
}

export enum ID {
  Exitocol = "EXITOCOL",
}

export interface PaymentSystem {
  id: number;
  name: PaymentSystemNameEnum;
  groupName: GroupName;
  validator: null;
  stringId: string;
  template: string;
  requiresDocument: boolean;
  isCustom: boolean;
  description: null | string;
  requiresAuthentication: boolean;
  dueDate: Date;
  availablePayments: null;
}
