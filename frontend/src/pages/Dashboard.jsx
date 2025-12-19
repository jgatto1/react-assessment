// Dashboard Page - TO BE IMPLEMENTED BY CANDIDATE
// This is a basic placeholder structure

import { useEffect, useState } from "react";
import PortfolioSummaryCard from "../components/PortfolioSummaryCard";
import TopGainersLosers from "../containers/dashboard/TopGainersLosers";
import RecentNewsFeed from "../containers/dashboard/RecentNewsFeed";
import ActiveAlertsSummary from "../containers/dashboard/ActiveAlertsSummary";
import { getPortfolio, getDashboard } from "../services/api";

const Dashboard = () => {
  // using these simple states. Consider using Tanstack Query for state management.
  // I think it's better to create different states for different data to keep components separate and easier to manage.
  const [portfolioData, setPortfolioData] = useState(null);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const [errorPortfolio, setErrorPortfolio] = useState(null);
  
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [errorDashboard, setErrorDashboard] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await getPortfolio();
        console.log(response.data.success);
        if (response.data.success) {
          setPortfolioData(response.data.data);
        } else {
          setErrorPortfolio(response.data.message);
        }
      } catch (error) {
        setErrorPortfolio(error);
      } finally {
        setLoadingPortfolio(false);
      }
    };
    fetchPortfolioData();
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getDashboard();
        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          setErrorDashboard(response.data.message);
        }
      } catch (error) {
        setErrorDashboard(error);
      } finally {
        setLoadingDashboard(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {/* Cards */}
      <div className="flex">
        <PortfolioSummaryCard
          totalValue={portfolioData?.totalValue}
          totalChange={portfolioData?.totalChange}
          totalChangePercent={portfolioData?.totalChangePercent}
          isLoading={loadingPortfolio}
          error={errorPortfolio}
        />
      </div>
      <TopGainersLosers
        dashboardData={dashboardData}
        isLoading={loadingDashboard}
        error={errorDashboard}
      />
      <RecentNewsFeed
        dashboardData={dashboardData}
        isLoading={loadingDashboard}
        error={errorDashboard}
      />
      <ActiveAlertsSummary
        dashboardData={dashboardData}
        isLoading={loadingDashboard}
        error={errorDashboard}
      />
    </div>
  );
};

export default Dashboard;
