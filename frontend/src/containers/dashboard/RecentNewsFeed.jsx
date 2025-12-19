import Card from "../../components/general/Card";
import Title from "../../components/general/Title";
import { formatTimestamp } from "../../utils/index";

const getCategoryColor = (category) => {
  const colors = {
    macro: "bg-blue-100 text-blue-800",
    technology: "bg-purple-100 text-purple-800",
    crypto: "bg-yellow-100 text-yellow-800",
    earnings: "bg-green-100 text-green-800",
    market: "bg-gray-100 text-gray-800",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

const NewsItem = ({ news }) => {
  return (
    <div className="py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                news.category
              )}`}
            >
              {news.category}
            </span>
            <span className="text-xs text-gray-500">
              {formatTimestamp(news.timestamp)}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{news.title}</h3>
          <p className="text-sm text-gray-600">{news.source}</p>
        </div>
      </div>
    </div>
  );
};

const RecentNewsFeed = ({ dashboardData, isLoading, error }) => {
  if (isLoading) {
    return (
      <Card>
        <div className="text-gray-600">Loading news...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-red-600">Error loading news: {error}</div>
      </Card>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const recentNews = dashboardData.recentNews || [];

  return (
    <Card>
      <Title>Recent News Feed</Title>
      {recentNews.length === 0 ? (
        <div className="text-gray-500 text-sm">No news available</div>
      ) : (
        <div>
          {recentNews.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentNewsFeed;
