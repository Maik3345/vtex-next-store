import { RenderManager } from "@/components";
import { getHomePageContent } from "@/shared";

export default async function Home() {
  const content = await getHomePageContent();
  console.log({ content });

  return (
    <div>
      <RenderManager content={content} />
    </div>
  );
}
