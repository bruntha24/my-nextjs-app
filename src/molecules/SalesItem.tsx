"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import CountUp from "react-countup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

type Contributor = {
  name: string;
  role: string;
};

type Notebook = {
  title: string;
  description: string;
  link: string;
};

interface SalesItemProps {
  year: number | "All";
  sales: number;
  views: number;
  downloads: number;
  engagement: number;
  comments: number;
  topContributors: Contributor[];
  relatedNotebooks: Notebook[];
  monthly: number[];
}

const SalesItem: React.FC<SalesItemProps> = ({
  year,
  sales,
  views,
  downloads,
  engagement,
  comments,
  topContributors,
  relatedNotebooks,
  monthly,
}) => {
  const monthlyBarData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Monthly Sales",
        data: monthly,
        backgroundColor: "rgba(185, 28, 28, 0.8)",
      },
    ],
  };

  const metricsDoughnutData = {
    labels: ["Sales", "Downloads", "Engagement"],
    datasets: [
      {
        data: [sales, downloads, engagement],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(234, 179, 8, 0.8)",
        ],
      },
    ],
  };

  const contributorPieData = {
    labels: topContributors.map((c) => c.name),
    datasets: [
      {
        data: topContributors.map(() => 1),
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(99, 102, 241, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(236, 72, 153, 0.8)",
        ],
      },
    ],
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-md mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Year heading */}
      <motion.h2
        className="text-2xl font-bold mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {year === "All" ? "All Years Combined" : `Year ${year}`}
      </motion.h2>

      {/* Monthly Sales Bar Chart */}
      <div className="mb-8">
        <Bar data={monthlyBarData} />
      </div>

      {/* Animated Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8">
        {[
          { label: "Sales", value: sales },
          { label: "Views", value: views },
          { label: "Downloads", value: downloads },
          { label: "Comments", value: comments },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className="bg-gray-50 p-4 rounded-lg shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 * idx }}
          >
            <div className="text-2xl font-bold text-red-700">
              <CountUp end={stat.value} duration={1.5} separator="," />
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Doughnut & Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Metrics */}
        <motion.div
          className="bg-gray-50 p-4 rounded-xl flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-2">Overall Metrics</h3>
          <div className="relative" style={{ width: "300px", height: "300px" }}>
            <Doughnut
              data={metricsDoughnutData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </motion.div>

        {/* Top Contributors */}
        <motion.div
          className="bg-gray-50 p-4 rounded-xl flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-2">Top Contributors</h3>
          <div style={{ width: "500px", height: "500px" }}>
            <Pie data={contributorPieData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <p className="mt-4 text-center text-gray-600 text-sm">
            {topContributors.map((c, i) => (
              <span key={i}>
                {c.name}
                {i < topContributors.length - 1 && " • "}
              </span>
            ))}
          </p>
        </motion.div>
      </div>

      {/* Related Notebooks */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold mb-2">Related Notebooks</h3>
        <ul className="list-none space-y-1">
          {relatedNotebooks.map((nb, idx) => (
            <li key={idx} className="flex items-center space-x-2">
              <span>📘</span>
              <a
                href={nb.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {nb.title}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default SalesItem;
