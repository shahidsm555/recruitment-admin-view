
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";

export default function DashboardWrapper() {
    const { userRole } = useStore();
    const router = useRouter();
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            if (userRole === "SUPER_USER") {
                router.push("/super/dashboard");
            } else if (userRole === "SYSTEM_ADMIN") {
                router.push("/admin/dashboard");
            }
        }
    }, [userRole, router, mounted]);

    if (!mounted) {
        return null;
    }

    // Default Dashboard (Ecommerce) for GUEST or if no role selected
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 space-y-6 xl:col-span-7">
                <EcommerceMetrics />
                <MonthlySalesChart />
            </div>

            <div className="col-span-12 xl:col-span-5">
                <MonthlyTarget />
            </div>

            <div className="col-span-12">
                <StatisticsChart />
            </div>

            <div className="col-span-12 xl:col-span-5">
                <DemographicCard />
            </div>

            <div className="col-span-12 xl:col-span-7">
                <RecentOrders />
            </div>
        </div>
    );
}
