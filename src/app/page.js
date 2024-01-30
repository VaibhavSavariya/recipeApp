import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getRandomRecipesData } from "./utils/queryFunctions";
import Dashboard from "./dashboard/dashboard";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["recipes"],
    queryFn: getRandomRecipesData,
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main>
          <Dashboard />
        </main>
      </HydrationBoundary>
    </>
  );
}
