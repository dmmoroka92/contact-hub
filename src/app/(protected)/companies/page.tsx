import { getCompanies } from "@/features/companies/queries/get-companies.query";

import CompaniesHeader from "./components/companies-header";
import CompaniesTable from "./components/companies-table";

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

  const perPage = [10, 25, 50].includes(requestedPerPage)
    ? requestedPerPage
    : 10;

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