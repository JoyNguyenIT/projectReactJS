import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts'
import './DashBoard.scss'
import { useEffect, useState } from 'react'
import { getDashboardOverview } from '../../../services/apiService'

const DashBoard = (props) => {


    const [dataOverview, setDataOverview] = useState([])
    const [dataChart, setDataChart] = useState([])

    useEffect(() => {
        fechtDataOverview()
    }, [])

    const fechtDataOverview = async () => {
        let res = await getDashboardOverview()
        if (res && res.EC === 0 && res.DT) {
            let Qz = 0, Qs = 0, As = 0;
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;

            const data = [
                {
                    "name": "Quizzes",
                    "Qz": Qz


                },
                {
                    "name": "Questions",
                    "Qs": Qs

                },
                {
                    "name": "Answers",
                    "As": As

                }
            ]
            setDataChart(data)
            setDataOverview(res.DT)
        }
    }
    return (
        <div className="dashboard-container">
            <div className='title'>Analystic Dashboard</div>
            <div className='main-content'>
                <div className='left-content'>
                    <div className='child'>
                        <span>Total Users</span>
                        <span className='numtext'>
                            {dataOverview && dataOverview.users && dataOverview.users.total
                                ? <>{dataOverview.users.total}</>
                                : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span>Total Quizzes</span>
                        <span className='numtext'>
                            {dataOverview && dataOverview.others && dataOverview.others.countQuiz
                                ? <>{dataOverview.others.countQuiz}</>
                                : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span>Total Questions</span>
                        <span className='numtext'>
                            {dataOverview && dataOverview.others && dataOverview.others.countQuestions
                                ? <>{dataOverview.others.countQuestions}</>
                                : <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span>Total Answers</span>
                        <span className='numtext'>
                            {dataOverview && dataOverview.others && dataOverview.others.countAnswers
                                ? <>{dataOverview.others.countAnswers}</>
                                : <>0</>
                            }
                        </span>
                    </div>
                </div>
                <div className='right-content'>
                    <ResponsiveContainer width="95%" height="95%">
                        <BarChart width={730} height={250} data={dataChart}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#5672a9" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    )
}
export default DashBoard