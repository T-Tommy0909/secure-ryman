import { redirect } from "next/navigation";
import { serverApi } from "../_trpc/server-api";

export const checkManagerOrSecurity = async (userId: string) => {
  const userRole = await serverApi.users.fetchUserType({
    id: userId,
  });
  if (!userRole) {
    redirect("/api/auth/login");
  }
  if (userRole !== "MANAGER" && userRole !== "SECURITY") {
    // todo: redirect to 403 page
    redirect("/");
  }
};
