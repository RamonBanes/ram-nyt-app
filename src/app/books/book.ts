import { BookReview } from "./book-review"

export interface Book extends BookReview {
    display_name: string
    list_name : string
    newest_published_date : string
    oldest_published_date: string
    updated : string
    list_name_encoded: string
    bookReview : BookReview
}