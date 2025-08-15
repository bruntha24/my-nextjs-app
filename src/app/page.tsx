"use client";

import React, { useEffect, useState } from "react";
import SalesItem from "@/molecules/SalesItem"; // Adjust import path if needed
import YearFilter from "@/organisms/YearFilter"; // Adjust import path if needed

type Contributor = {
  name: string;
  role: string;
};

type Notebook = {
  title: string;
  description: string;
  link: string;
};

type SalesData = {
  year: number;
  sales: number;
  views: number;
  downloads: number;
  engagement: number;
  comments: number;
  topContributors: Contributor[];
  relatedNotebooks: Notebook[];
  monthly: number[];
};

export default function Page() {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | "All">("All");

  useEffect(() => {
    import("@/data/SalesByYear.json")
      .then((module) => setSalesData(module.default))
      .catch((err) => console.error("Error loading sales data:", err));
  }, []);

  const years: (number | "All")[] = ["All", ...salesData.map((item) => item.year)];

  let currentData: SalesData | null = null;

  if (selectedYear === "All" && salesData.length > 0) {
    const combined = salesData.reduce(
      (acc, curr) => {
        acc.sales += curr.sales;
        acc.views += curr.views;
        acc.downloads += curr.downloads;
        acc.engagement += curr.engagement;
        acc.comments += curr.comments;
        acc.monthly = acc.monthly.map((m, i) => m + (curr.monthly[i] || 0));
        acc.topContributors = [...acc.topContributors, ...curr.topContributors];
        acc.relatedNotebooks = [...acc.relatedNotebooks, ...curr.relatedNotebooks];
        return acc;
      },
      {
        year: 0,
        sales: 0,
        views: 0,
        downloads: 0,
        engagement: 0,
        comments: 0,
        topContributors: [] as Contributor[],
        relatedNotebooks: [] as Notebook[],
        monthly: new Array(12).fill(0),
      }
    );

    currentData = { ...combined, year: 0 };
  } else {
    currentData = salesData.find((item) => item.year === selectedYear) || null;
  }

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Kaggle Survey Report</h1>

      <YearFilter
        years={years}
        selectedYear={selectedYear}
        onYearChange={(year) => setSelectedYear(year)}
      />

      {currentData && (
        <SalesItem
          year={selectedYear}
          sales={currentData.sales}
          views={currentData.views}
          downloads={currentData.downloads}
          engagement={currentData.engagement}
          comments={currentData.comments}
          topContributors={currentData.topContributors}
          relatedNotebooks={currentData.relatedNotebooks}
          monthly={currentData.monthly}
        />
      )}
    </main>
  );
}