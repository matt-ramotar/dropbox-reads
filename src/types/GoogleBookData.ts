interface ThumbnailInfo {
    smallThumbnail: string
    thumbnail: string
}

interface VolumeInfo {
    title: string
    subtitle: string
    authors: string[]
    publisher: string
    publishedDate: string
    description: string
    pageCount: number
    printType: string
    categories: string[]
    averageRating: number
    imageLinks: ThumbnailInfo
    language: string
    previewLink: string
    infoLink: string
}

interface SaleBookInfo {
    buyLink: string
}
interface SearchInfo {
    textSnippet: string
}

interface BookLinkInfo {
    isAvailable: boolean
    acsTokenLink: string
}

interface BookAccessInfo {
    country: string
    epub: BookLinkInfo
    pdf: BookLinkInfo
    webReaderLink: string
    accessViewStatus: string
}

export interface GoogleBookData {
    id: string
    kind: string
    etag: string
    selfLink: string
    volumeInfo: VolumeInfo
    saleInfo: SaleBookInfo
    accessInfo: BookAccessInfo
    searchInfo: SearchInfo

}