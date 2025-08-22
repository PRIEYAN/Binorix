import React from "react";
import Filter from "../../components/dashboard/Filter";

export default function PrescriptionManager(){
    return(
        <>
            <section>
                <div className="flex flex-col gap-3">
                    <h1 className="font-extrabold text-2xl text-blue-600">Manage Doctor Prescriptions</h1>
                    <p className="font-medium">Apply Filters to get specific doctor prescription</p>
                {/* <Filter/> */}
                </div>
            </section>
        </>
    )
}
