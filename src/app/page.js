import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import recipes from "./axios/Services/recipes";
import { getRandomRecipesData } from "./utils/queryFunctions";
import dynamic from "next/dynamic";
const Dashboard = dynamic(() => import("./dashboard/dashboard"), {
  ssr: false,
});
export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["recipes"],
    queryFn: getRandomRecipesData,
  });
  return (
    <>
      <main>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Dashboard />
        </HydrationBoundary>
      </main>
    </>
  );
}
