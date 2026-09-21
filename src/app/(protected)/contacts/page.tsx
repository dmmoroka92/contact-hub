import { getCompanies } from "@/features/queries/get-companies"
import ContactsHeader from "./components/contacts-header"

async function ContactsPage() {
  const companies = await getCompanies()
  
  return <>
    <ContactsHeader companies={companies} />
  </>
}

export default ContactsPage