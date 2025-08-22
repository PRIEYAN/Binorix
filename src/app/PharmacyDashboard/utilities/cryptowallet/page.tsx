'use client';

import WalletAddress from "@/app/PharmacyDashboard/components/WalletAddress";
import Balance from "@/app/PharmacyDashboard/components/Balance";
import CryptoNetwork from "@/app/PharmacyDashboard/components/CryptoNetwork";
import WalletType from "@/app/PharmacyDashboard/components/WalletType";
import WalletConnect from "@/app/providers";

export default function WalletPage() {
    return (
        <div className=" bg-white flex items-center justify-center">
            <div className="w-full h-full text-blue rounded-xl shadow-lg p-8 flex flex-col gap-6">

                <div className="w-full flex justify-start">
                    <WalletConnect />
                </div>

                <h1 className="text-3xl font-bold">Crypto Wallet</h1>

                <div className="flex flex-col gap-4 flex-grow justify-center">
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <WalletAddress />
                        <Balance />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <CryptoNetwork />
                        <WalletType />
                    </div>
                </div>
            </div>
        </div>
    );
}