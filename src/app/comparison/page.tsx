import { NextPage } from "next";
import ComparisonField from "@/app/_components/comparison/ComparisonField";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { serverApi } from "../_trpc/server-api";
import { checkManagerOrSecurity } from "../_utils/authCheck";

const Comparison: NextPage = async () => {
  const session = await getSession();
  if (!session || !session.user) {
    redirect("/api/auth/login");
  }

  const userId = session.user.sub as string;
  await checkManagerOrSecurity(userId);

  const myCompanyResult = await serverApi.company.myCompanyResult({
    userId: session.user.sub,
  });
  const myIndustryResult = await serverApi.company.myIndustryResult({
    userId: session.user.sub,
  });
  const competitorIndustryResultList =
    await serverApi.company.competitorIndustryResultList({
      userId: session.user.sub,
    });

  return (
    <main className="min-h-screen p-4">
      <ComparisonField
        myCompanyResult={myCompanyResult}
        myIndustryResult={myIndustryResult}
        competitorIndustryResultList={competitorIndustryResultList}
      />
    </main>
  );
};

export default Comparison;
