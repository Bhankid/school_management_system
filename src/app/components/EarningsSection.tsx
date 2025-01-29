"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAllFees, getTotalEarnings } from "../actions/feeActions";
import { useState, useEffect } from "react";
import toastr from "toastr";

interface EarningsData {
  day: string;
  totalCollections: number;
  feesCollections: number;
}

function EarningsSection() {
  const [earningsData, setEarningsData] = useState<EarningsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [totalFeesCollections, setTotalFeesCollections] = useState<number>(0);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const fees = await getAllFees();

        if (fees.length === 0) {
          toastr.options = {
            closeButton: true,
            progressBar: true,
            positionClass: "toast-bottom-right",
            timeOut: 3000,
          };
          toastr.error("No fees found!", "Error");
          setLoading(false);
          return;
        }

        const totalEarnings = await getTotalEarnings();
        setTotalEarnings(totalEarnings);

        const paidFees = fees.filter((fee) => fee.status.toLowerCase() === "paid");

        // Sum fees amounts and round them to the nearest whole number
        const totalFeesCollections = Math.round(
          paidFees.reduce((acc, fee) => acc + Number(fee.amount), 0)
        );
        setTotalFeesCollections(totalFeesCollections);

        const earningsData = fees.map((fee) => {
          const day = new Date(fee.dueDate).toLocaleString("en-US", {
            weekday: "short",
          });
          return {
            day,
            totalCollections: Number(fee.amount),
            feesCollections: fee.status.toLowerCase() === "paid" ? Number(fee.amount) : 0,
          };
        });
        setEarningsData(earningsData);

        toastr.options = {
          closeButton: true,
          progressBar: true,
          positionClass: "toast-bottom-right",
          timeOut: 3000,
        };
        toastr.success("Fees data fetched successfully!", "Success");
      } catch (error) {
        setError((error as Error).message);
        toastr.options = {
          closeButton: true,
          progressBar: true,
          positionClass: "toast-bottom-right",
          timeOut: 3000,
        };
        toastr.error("Error fetching fees data: " + (error as Error).message, "Error");
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg flex justify-center items-center min-h-[250px] sm:min-h-[300px]">
        <h2 className="text-lg text-gray-800 animate-pulse">Loading Earnings...</h2>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (earningsData.length === 0) {
    return <div className="text-gray-700">No data available.</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2 sm:mb-0">
          Earnings
        </h2>
        <div className="text-sm sm:text-base text-gray-700">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-4">
        <div>
          <p className="text-gray-700 text-sm sm:text-base">Total Collections</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-500">
            ₵{totalEarnings.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-700 text-sm sm:text-base">Fees Collections</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-500">
            ₵{totalFeesCollections.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="h-[250px] sm:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => `₵${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalCollections"
              name="Total Collections"
              stroke="#0546D1FF"
              strokeWidth={2}
              dot={{ fill: "#074AD9FF" }}
            />
            <Line
              type="monotone"
              dataKey="feesCollections"
              name="Fees Collections"
              stroke="#C71013FF"
              strokeWidth={2}
              dot={{ fill: "#C60A0AFF" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EarningsSection;
