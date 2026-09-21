import { getCompanies } from "@/features/companies/queries/get-companies.query"
import ContactStats from "./components/contact-stats"
import ContactsHeader from "./components/contacts-header"

async function ContactsPage() {
  const companies = await getCompanies()
  
  return (
    <div className="flex flex-col gap-6">
      <ContactsHeader companies={companies} />
      <ContactStats />
    </div>
  )
}

export default ContactsPage