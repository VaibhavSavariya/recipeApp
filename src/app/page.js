import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Dashboard from "./dashboard/dashboard";
import recipes from "./axios/Services/recipes";
import { getRandomRecipesData } from "./utils/queryFunctions";
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
