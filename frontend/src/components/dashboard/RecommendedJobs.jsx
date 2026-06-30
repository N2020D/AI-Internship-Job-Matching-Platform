import { HiBriefcase } from "react-icons/hi2";

function RecommendedJobs({ profile }) {

    const jobs = profile?.recommendedRoles || [];

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Recommended Jobs

            </h2>

            {

                jobs.length === 0 ?

                (

                    <p className="text-gray-500">

                        Upload your resume to receive AI-powered job recommendations.

                    </p>

                )

                :

                (

                    <div className="space-y-3">

                        {

                            jobs.map((job,index)=>(

                                <div

                                key={index}

                                className="flex items-center justify-between border rounded-xl p-4 hover:bg-blue-50 transition"

                                >

                                    <div className="flex items-center gap-3">

                                        <HiBriefcase className="text-blue-600 text-xl"/>

                                        <div>

                                            <h3 className="font-semibold">

                                                {job}

                                            </h3>

                                            <p className="text-sm text-gray-500">

                                                Recommended by AI Resume Analyzer

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default RecommendedJobs;