import { getCompanies } from "@/features/companies/queries/get-companies.query";

import CompaniesHeader from "./components/companies-header";
import CompaniesTable from "./components/companies-table";
import { ITEMS_PER_PAGE } from "@/constants/pagination";

type CompaniesPageProps = {
  searchParams: Promise<{
    page?: string;
    perPage?: string;
  }>;
};

async function CompaniesPage({
  searchParams,
}: CompaniesPageProps) {
  const params = await searchParams;

  const page = Math.max(
    Number(params.page) || 1,
    1,
  );

  const requestedPerPage = Number(params.perPage);

  const perPage = ITEMS_PER_PAGE.includes(requestedPerPage)
    ? requestedPerPage
    : 1;

  const {
    data: companies,
    pagination,
  } = await getCompanies({
    page,
    perPage,
  });

  return (
    <div className="flex flex-col gap-6">
      <CompaniesHeader />

      <CompaniesTable
        companies={companies}
        pagination={pagination}
      />
    </div>
  );
}

export default CompaniesPage;