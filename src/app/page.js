import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getRandomRecipesData } from "./utils/queryFunctions";
import Dashboard from "./dashboard/dashboard";

const Home = async () => {
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
};

export default Home;
