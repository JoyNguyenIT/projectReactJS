import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getHistoryQuiz } from '../../../services/apiService';
import { slice } from 'lodash';
import { format } from 'date-fns';

const History = () => {

    const [dataHistory, setDataHistory] = useState([])

    useEffect(() => {
        fetchHistoryQuiz()
    }, [])

    const fetchHistoryQuiz = async () => {
        let res = await getHistoryQuiz()
        if (res.EC === 0 && res.DT.data.length > 9) {
            setDataHistory(res.DT.data.slice(res.DT.data.length - 9, res.DT.data.length - 1))
        }
        console.log(dataHistory)
    }

    return (
        <>
            <Table striped bordered hover variant="white">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Quiz Name</th>
                        <th>Total Question</th>
                        <th>Total Correct</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {dataHistory && dataHistory.length > 0 &&
                        dataHistory.map((item, index) => {
                            let date = new Date(item.createdAt)
                            let formatDate = format(date, 'dd/MM/yyyy HH:mm:ss');
                            return (
                                <tr key={`history-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.quizHistory.name}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{formatDate}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    );
}

export default History;