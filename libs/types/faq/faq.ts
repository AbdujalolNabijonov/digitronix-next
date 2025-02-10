import { FaqCategory } from "@/libs/enum/faq.enum"

export interface FaqObj {
    _id: string
    faqQuestion: string
    faqAnswer: string
    faqCategory: FaqCategory
    createdAt: Date
    updatedAt: Date
}