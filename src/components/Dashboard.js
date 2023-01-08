import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from 'react-date-picker';
import ReactApexChart from "react-apexcharts";

const chartOptions = {
    xaxis: {
        type: 'datetime',
        labels: {
            datetimeFormatter: {
                year: 'yyyy',
                month: 'MMM \'yy',
                day: 'dd MMM',
                hour: 'HH:mm'
            }
        }
    },
    tooltip: {
        x: {
            show: true,
            format: 'dd MMM yyyy HH:mm',
            formatter: undefined,
        }
    },
    selection: {
        enabled: true,
        type: 'x',
        fill: {
            color: '#24292e',
            opacity: 0.1
        },
        stroke: {
            width: 1,
            dashArray: 3,
            color: '#24292e',
            opacity: 0.4
        },
        xaxis: {
            labels: {
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM \'yy',
                    day: 'dd MMM',
                    hour: 'HH:mm'
                }
            }
        },
        yaxis: {
            min: undefined,
            max: undefined
        }
    }
}

const Dashboard = () => {
    const [generalInsight, setGeneralInsight] = useState({});
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const [chartData, setChartData] = useState([{ data: [], name: "No of Searches" }]);

    useEffect(() => {
        axios.get('insights').then(result => {
            if (result.status === 200 && result.data) {
                setGeneralInsight(result.data);
            }
        }).catch(err => console.error(err));
    }, [])

    const getChartData = () => {
        axios.get(`insights/filter?from=${fromDate}&to=${toDate}`).then(res => {
            if (res.status === 200 && res.data && res.data.result && res.data.result.length) {
                setChartData([{ data: res.data.result, name: "No of Searches" }]);
            } else {
                setChartData([{ data: [], name: "No of Searches" }]);
            }
        }).catch(err => {
            console.error(err);
            setChartData([{ data: [], name: "No of Searches" }]);
        });
    }

    return (
        <>
            <h4>Welcome to Insights Dashboard</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Searches In Last Hour</th>
                        <th scope="col">Searches In Last Day</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(generalInsight).length
                        ?
                        <tr>
                            <td>{generalInsight.searchesPerHour}</td>
                            <td>{generalInsight.searchesPerDay}</td>
                        </tr>
                        :
                        <tr row>
                            <td colSpan="2">No Records Found</td>
                        </tr>
                    }
                </tbody>
            </table>
            <h4> Insights Chart </h4>
            <div>
                From: <DatePicker onChange={setFromDate} value={fromDate} maxDate={new Date()} />
                To: <DatePicker onChange={setToDate} value={toDate} />
                <button type="button" class="btn btn-dark" onClick={() => {
                    getChartData();
                }}>Submit</button>
            </div>
            {
                chartData && chartData[0] && chartData[0].data && chartData[0].data.length
                    ?
                    <ReactApexChart options={chartOptions} series={chartData} type="area" height={350} />
                    :
                    'No Records Found'
            }
        </>
    )
}

export default Dashboard;