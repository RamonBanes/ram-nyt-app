import { Link } from "./link"
import { Multimedia } from "./multimedia"

export interface Movie extends Link, Multimedia {
    display_title : string
    review : string
    byline : string
    summary_short : string
    critics_pick: string
    publication_date : string
    opening_date : string
    link: Link;
    multimedia: Multimedia
  }