export interface Weather {
  publicTime: string
  publicTimeFormatted: string
  publishingOffice: string
  title: string
  link: string
  description: Description
  forecasts: ForecastsEntity[]
  location: Location
  copyright: Copyright
}
export interface Description {
  publicTime: string
  publicTimeFormatted: string
  headlineText: string
  bodyText: string
  text: string
}
export interface ForecastsEntity {
  date: string
  dateLabel: string
  telop: string
  detail: Detail
  temperature: Temperature
  chanceOfRain: ChanceOfRain
  image: Image
}
export interface Detail {
  weather: string
  wind: string
  wave: string
}
export interface Temperature {
  min: MinOrMax
  max: MinOrMax
}
export interface MinOrMax {
  celsius?: string | null
  fahrenheit?: string | null
}
export interface ChanceOfRain {
  T00_06: string
  T06_12: string
  T12_18: string
  T18_24: string
}
export interface Image {
  title: string
  url: string
  width: number
  height: number
}
export interface Location {
  area: string
  prefecture: string
  district: string
  city: string
}
export interface Copyright {
  title: string
  link: string
  image: Image1
  provider?: ProviderEntity[] | null
}
export interface Image1 {
  title: string
  link: string
  url: string
  width: number
  height: number
}
export interface ProviderEntity {
  link: string
  name: string
  note: string
}
