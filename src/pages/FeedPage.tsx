import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";
import Feed from "@/components/Feed";

const FeedPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-5 relative">
        {/* Fixed left sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <LeftSidebar />
          </div>
        </div>

        {/* Scrollable center feed */}
        <main className="pb-24 min-h-screen">
          <Feed />
        </main>

        {/* Fixed right sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
