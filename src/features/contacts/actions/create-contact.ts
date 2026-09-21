"use server"

import { headers } from "next/headers"

import { db } from "@/db"
import { contacts } from "@/db/contacts.schema"
import { auth } from "@/lib/auth"
import {
  ContactFormData,
  contactSchema
} from "../schemas/contacts.schema"

export async function createContact(formData: ContactFormData) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    throw new Error("Unauthozied")
  }

  const data = contactSchema.parse(formData)

  await db.insert(contacts).values({
    userId: session.user.id,
    companyId: data.companyId,
    firstName: data.firstName,
    lastName: data.lastName,
    contactType: data.contactType
  })
}
